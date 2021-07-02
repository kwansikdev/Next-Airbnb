import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import user from './user';
import common from './common';
import auth from './auth';

const rootReducer = combineReducers({
  common: common.reducer,
  auth: auth.reducer,
  user: user.reducer,
});

//* 스토어의 타입
export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    if (state === initialRootState) {
      return state;
    }

    return {
      ...state,
      ...action.payload,
    };
  }
  return rootReducer(state, action);
};

//* 타입 지원되는 커스텀 useSelector 만들기
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore = () => {
  const store = configureStore({
    reducer,
    devTools: true,
  });

  // initialRootState = store.getState();

  return store;
};

export const wrapper = createWrapper(initStore);
