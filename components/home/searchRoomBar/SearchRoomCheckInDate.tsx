import React from 'react';

import DatePicker from '../../common/DatePicker';
import useSearchRoomDate from '../../../hooks/useSearchRoomDate';

import styled, { css } from 'styled-components';
import palette from '../../../styles/palette';

const Container = styled.div<{ type: string }>`
  position: relative;
  width: 100%;
  height: 70px;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;

  ${({ type }) =>
    type === 'header' &&
    css`
      height: 46px;
    `};

  &:hover {
    border-color: ${palette.gray_dd};
  }

  .search-room-bar-date-label {
    margin-bottom: 4px;
    font-size: 10px;
    font-weight: 800;
    z-index: 10;
  }

  input {
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 12px;
    outline: none;
    cursor: pointer;
    font-weight: 600;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding-left: 20px;

    > div {
      height: fit-content;
    }

    .react-datepicker-wrapper {
      width: 100%;

      .react-datepicker__input-container {
        width: 100%;
      }
    }

    .react-datepicker {
      display: flex;
    }
  }
`;

interface Props {
  type?: 'main' | 'header';
}

const SearchRoomCheckInDate: React.FC<Props> = ({ type = 'main' }) => {
  const { checkInDate, checkOutDate, setCheckInDateDispatch } = useSearchRoomDate();

  const onChangeCheckInDate = (date: Date | null) => setCheckInDateDispatch(date);

  return (
    <Container type={type}>
      <div>
        {type === 'main' && <p className='search-room-bar-date-label'>체크인</p>}
        <DatePicker
          placeholderText='날짜 추가'
          selected={checkInDate}
          startDate={checkInDate}
          endDate={checkOutDate}
          monthsShown={2}
          minDate={new Date()}
          selectsStart
          onChange={onChangeCheckInDate}
        />
      </div>
    </Container>
  );
};

export default SearchRoomCheckInDate;
