import React from 'react';

import { useSelector } from '../../../store';

import styled from 'styled-components';
import palette from '../../../styles/palette';

const Container = styled.div`
  width: 1120px;
  margin: auto;
  padding-top: 26px;
  padding-bottom: 100px;

  .room-detail-title {
    margin-bottom: 15px;
    font-size: 26px;
    font-weight: 800;
  }

  .room-detail-location {
    margin-bottom: 24px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: underline;
    color: ${palette.gray_71};
  }
`;

const RoomDetail: React.FC = () => {
  const room = useSelector((state) => state.room.detail);

  if (!room) return null;

  return (
    <Container>
      <h1 className='room-detail-title'>{room.title}</h1>
      <p className='room-detail-location'>
        {room.district}, {room.city}, {room.country}
      </p>
    </Container>
  );
};

export default RoomDetail;
