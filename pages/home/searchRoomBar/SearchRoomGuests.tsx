import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import Counter from '../../../components/common/Counter';
import SearchRoomButton from '../../../components/home/searchRoomBar/SearchRoomButton';
import { useSelector } from '../../../store';
import { searchRoomActions } from '../../../store/searchRoom';
import palette from '../../../styles/palette';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    border-color: ${palette.gray_dd};
  }

  > div {
    width: 100%;
    height: 100%;
  }

  .search-room-bar-guests-texts {
    position: absolute;
    top: 16px;
    left: 20px;
    width: calc(100% - 114px);
  }

  .search-room-bar-guests-label {
    margin-bottom: 4px;
    font-size: 10px;
    font-weight: 800;
  }

  .search-room-bar-guest-text {
    font-size: 14px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .search-room-bar-button-wrapper {
    position: absolute;
    top: 12px;
    right: 12px;
  }

  .search-room-bar-guests-popup {
    background-color: #fff;
    position: absolute;
    top: 78px;
    right: 0;
    width: 394px;
    padding: 16px 32px;
    border-radius: 32px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
    cursor: default;
  }

  .search-room-bar-guests-counter-wrapper {
    padding: 16px 0;
    border-bottom: 1px solid ${palette.gray_eb};

    &:last-child {
      border: 0;
    }
  }
`;

const SearchRoomGuests: React.FC = () => {
  const dispatch = useDispatch();

  const adultCount = useSelector((state) => state.searchRoom.adultCount);
  const childrenCount = useSelector((state) => state.searchRoom.childrenCount);
  const infantsCount = useSelector((state) => state.searchRoom.infantsCount);

  const [popupOpened, setPopupOpened] = useState(false);

  //* 성인 수 변경하기 Dispatch
  const setAdultCountDispatch = (value: number) => {
    dispatch(searchRoomActions.setAdultCount(value));
  };
  //* 어린이 수 변경하기 Dispatch
  const setChildrenCountDispatch = (value: number) => {
    dispatch(searchRoomActions.setChildrenCount(value));
  };

  //* 유아 수 변경하기 Dispatch
  const setInfantCountDispatch = (value: number) => {
    dispatch(searchRoomActions.setInfantCount(value));
  };

  //* 게스트 인원 수 텍스트
  const guestsText = `게스트 ${adultCount}명${!childrenCount ? '' : `, 어린이${childrenCount}명`}${
    !infantsCount ? '' : `, 유아${infantsCount}명`
  }`;

  return (
    <Container onClick={() => setPopupOpened(true)}>
      <OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
        <div className='search-room-bar-guests-texts'>
          <p className='search-room-bar-guests-label'>인원</p>
          <p className='search-room-bar-guests-text'>{guestsText}</p>
        </div>

        <div className='search-room-bar-button-wrapper'>
          <SearchRoomButton />
        </div>

        {popupOpened && (
          <div className='search-room-bar-guests-popup'>
            <div className='search-room-bar-guests-counter-wrapper'>
              <Counter
                label='성인'
                description='만 13세 이상'
                minValue={1}
                value={adultCount}
                onChange={(count) => setAdultCountDispatch(count)}
              />
            </div>
            <div className='search-room-bar-guests-counter-wrapper'>
              <Counter
                label='어린이'
                description='2~12세'
                minValue={0}
                value={childrenCount}
                onChange={(count) => setChildrenCountDispatch(count)}
              />
            </div>
            <div className='search-room-bar-guests-counter-wrapper'>
              <Counter
                label='유아'
                description='2세 미만'
                minValue={0}
                value={infantsCount}
                onChange={(count) => setInfantCountDispatch(count)}
              />
            </div>
          </div>
        )}
      </OutsideClickHandler>
    </Container>
  );
};

export default SearchRoomGuests;
