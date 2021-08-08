import React, { useState } from 'react';

import styled, { css } from 'styled-components';
import palette from '../../../styles/palette';
import SearchIcon from '../../../public/static/svg/search/amaranth_search.svg';
import Button from '../../common/Button';
import SearchRoomBarLocation from './SearchRoomBarLocation';
import SearchRoomCheckInDate from './SearchRoomCheckInDate';
import SearchRoomCheckOutDate from './SearchRoomCheckOutDate';
import Link from 'next/link';
import { useSelector } from '../../../store';
import { makeQueryString } from '../../../lib/utils';

const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${palette.gray_eb};
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    width: 54px;
    height: 46px;
    border: none;
    cursor: pointer;
  }
`;

const SearchRoomMiniBar: React.FC = () => {
  const searchRoom = useSelector((state) => state.searchRoom);

  const roomListHref = makeQueryString('/room', searchRoom);

  return (
    <Container>
      <SearchRoomBarLocation type='header' />
      <SearchRoomCheckInDate type='header' />
      <SearchRoomCheckOutDate type='header' />
      <Link href={roomListHref}>
        <a>
          <button>
            <SearchIcon />
          </button>
        </a>
      </Link>
    </Container>
  );
};

export default SearchRoomMiniBar;
