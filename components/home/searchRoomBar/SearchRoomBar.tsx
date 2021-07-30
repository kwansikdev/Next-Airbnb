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

  .search-room-bar-inputs {
    display: flex;
    align-items: center;
    width: 100%;

    .search-room-bar-input-divider {
      background-color: ${palette.gray_dd};
      width: 1px;
      height: 44px;
    }
  }
`;

const SearchRoomBar: React.FC = () => {
  return (
    <Container>
      <div className='search-room-bar-inputs'>
        <SearchRoomBarLocation />
        <div className='search-room-bar-input-divider' />
        <SearchRoomCheckInDate />
        <div className='search-room-bar-input-divider' />
        <SearchRoomCheckOutDate />
        <div className='search-room-bar-input-divider' />
        <SearchRoomGuests />
      </div>
    </Container>
  );
};

export default SearchRoomBar;
