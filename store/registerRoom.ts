import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RegisterRoomState = {
  // 건물 유형 큰 범주
  largeBuildingType: string | null;
  // 건물 유형
  buildingType: string | null;
  // 숙소 유형
  roomType: string | null;
  // 게스트만을 위해 만들어진 숙소인가
  isSetUpForGuest: boolean | null;
};

const initialState: RegisterRoomState = {
  largeBuildingType: null,
  buildingType: null,
  roomType: null,
  isSetUpForGuest: null,
};

const registerRoom = createSlice({
  name: 'registerRoom',
  initialState,
  reducers: {
    // 큰 건물 유형 변경하기
    setLargeBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === '') {
        state.largeBuildingType = null;
      }

      state.largeBuildingType = action.payload;
    },
    // 건물 유형 변경하기
    setBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === '') {
        state.buildingType = null;
      }

      state.buildingType = action.payload;
    },
    // 숙소 유형 변경하기
    setRoomType(state, action: PayloadAction<'entire' | 'private' | 'public'>) {
      state.roomType = action.payload;
    },
    // 게스트용 숙소인지 변경하기
    setIsSetUpForGuest(state, action: PayloadAction<boolean>) {
      state.isSetUpForGuest = action.payload;
    },
  },
});

export const registerRoomAictions = { ...registerRoom.actions };

export default registerRoom;
