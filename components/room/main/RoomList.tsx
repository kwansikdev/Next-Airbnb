import React from 'react';

import RoomCard from './RoomCard';
import { useSelector } from '../../../store';

import styled from 'styled-components';

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-top: 50px;
`;

interface Props {
  showMap: boolean;
}

const RoomList: React.FC<Props> = ({ showMap }) => {
  const rooms = useSelector((state) => state.room.rooms);

  return (
    <Container>
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} showMap={showMap} />
      ))}
    </Container>
  );
};

export default RoomList;
