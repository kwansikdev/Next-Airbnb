import React, { useState } from 'react';
import { format } from 'date-fns';
import RoomList from './RoomList';

import { useSelector } from '../../../store';

import styled from 'styled-components';
import palette from '../../../styles/palette';
import MapIcon from '../../../public/static/svg/room/main/map.svg';

const Container = styled.div`
  margin: auto;
  padding: 50px 80px;

  .room-liet-info {
    margin-bottom: 8px;
  }

  .room-list-title {
    margin-bottom: 24px;
    font-size: 32px;
    font-weight: 800;
  }

  .room-list-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .room-list-buttons-left-side {
      display: flex;

      button {
        background-color: #fff;
        height: 36px;
        margin-right: 8px;
        height: 0 16px;
        border: 1px solid ${palette.gray_b0};
        border-radius: 30px;
        outline: none;
        cursor: pointer;

        &:hover {
          border-color: ${palette.black};
        }
      }
    }

    .room-list-show-map-button {
      background-color: #fff;
      display: flex;
      align-items: center;
      height: 42px;
      padding: 12px;
      border: 0;
      border-radius: 8px;
      outline: none;
      cursor: pointer;

      &:hover {
        background-color: ${palette.gray_f7};
      }

      svg {
        margin-right: 8px;
      }
    }
  }

  .room-list-wrapper {
    display: flex;
  }
`;

const RoomMain: React.FC = () => {
  const rooms = useSelector((state) => state.room.rooms);
  const checkInDate = useSelector((state) => state.searchRoom.checkInDate);
  const checkOutDate = useSelector((state) => state.searchRoom.checkOutDate);

  const [showMap, setShowMap] = useState(false);

  const getRoomListInfo = `${rooms.length}개의 숙소 ${
    checkInDate ? `${checkInDate ? format(new Date(checkInDate), 'MM월 dd일') : ''}` : ''
  } ${checkInDate ? `${checkOutDate ? format(new Date(checkOutDate), '- MM월 dd일') : ''}` : ''}`;

  return (
    <Container>
      <p className='room-list-info'>{getRoomListInfo}</p>
      <h1 className='room-list-title'>숙소</h1>
      <div className='room-list-buttons'>
        <div className='room-list-buttons-left-side'>
          <button type='button'>숙소 유형</button>
          <button type='button'>요금</button>
        </div>
        <button
          type='button'
          className='room-list-show-map-button'
          onClick={() => {
            setShowMap(!showMap);
          }}
        >
          <MapIcon /> 지도 표시하기
        </button>
      </div>
      <div className='room-list-wrapper'>
        <RoomList showMap={showMap} />
      </div>
    </Container>
  );
};

export default RoomMain;
