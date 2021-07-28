import React from 'react';

import SearchRoomBarLocation from './SearchRoomBarLocation';
import SearchRoomCheckInDate from './SearchRoomCheckInDate';
import SearchRoomCheckOutDate from './SearchRoomCheckOutDate';
import SearchRoomGuests from './SearchRoomGuests';

import styled from 'styled-components';
import palette from '../../../styles/palette';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  align-items: center;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
`;

const SearchRoomBar: React.FC = () => {
  return <Container>SearchRoomBar</Container>;
};

export default SearchRoomBar;
