import React from 'react';

import DatePicker from '../../common/DatePicker';
import useSearchRoomDate from '../../../hooks/useSearchRoomDate';

import styled from 'styled-components';
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

  .search-room-bar-date-label {
    position: absolute;
    top: 16px;
    left: 20px;
    margin-bottom: 4px;
    font-size: 10px;
    font-weight: 800;
    z-index: 10;
  }

  input {
    width: 100%;
    height: 100%;
    padding: 20px 0 0 20px;
    border: 0;
    border-radius: 12px;
    outline: none;
    cursor: pointer;
    font-weight: 600;
  }

  > div {
    width: 100%;
    height: 100%;

    .react-datepicker-wrapper {
      width: 100%;
      height: 100%;

      .react-datepicker__input-container {
        width: 100%;
        height: 100%;
      }
    }

    .react-datepicker {
      display: flex;
    }
  }
`;

const SearchRoomCheckInDate: React.FC = () => {
  const { checkInDate, checkOutDate, setCheckInDateDispatch } = useSearchRoomDate();

  const onChangeCheckInDate = (date: Date | null) => setCheckInDateDispatch(date);

  return (
    <Container>
      <div>
        <p className='search-room-bar-date-label'>체크인</p>
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
