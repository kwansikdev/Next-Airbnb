import React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import addHours from 'date-fns/addHours';

import styled from 'styled-components';
import palette from '../../styles/palette';
import 'react-datepicker/dist/react-datepicker.css';

const Container = styled.div`
  width: 100%;
  height: 100%;

  .react-datepicker {
    background-color: #fff;
    padding: 16px 32px;
    border-radius: 32px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px !important;
    cursor: pointer;
  }

  .react-datepicker__triangle {
    border-bottom-color: #fff !important;
  }

  .react-datepicker__month-container {
    padding: 0 27px;
  }

  .react-datepicker__header {
    background-color: #fff;
    padding-top: 22px;
    border: 0;
    font-size: 16px;
    font-weight: 600;
  }

  .react-datepicker__navigation--previous {
    top: 30px;
    left: 56px;
    border: 0;
    /* background-image: url('/static/svg/common/datePicker/datepicker_laft_arrow.svg');
    background-repeat: no-repeat; */
  }

  .react-datepicker__navigation--next {
    top: 30px;
    right: 56px;
    border: 0;
    /* background-image: url('/static/svg/common/datePicker/datepciker_right_arrow.svg');
    background-repeat: no-repeat; */
  }

  .react-datepicker__current-month {
    font-size: 16px;
    font-weight: 600;
    font-family: Airbnb Cereal, sans-serif;
  }

  .react-datepicker__day-names {
    padding-top: 16px;
  }

  .react-datepicker__day-name {
    width: 48px;
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    color: ${palette.gray_71};
  }

  .react-datepicker__month {
    margin: 0;
  }

  .react-datepicker__day {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    font-family: -apple-system, sans-serif;
    color: ${palette.black};
    outline: none;

    &:hover {
      background-color: #fff;
      border: 1px solid ${palette.black};
      border-radius: 50%;
      color: ${palette.black};
    }
  }

  .react-datepicker__day--in-range {
    background-color: ${palette.gray_f7};
  }

  .react-datepicker__day--in-selecting-range {
    background-color: ${palette.gray_f7};
  }

  .react-datepicker__day--selected {
    background-color: ${palette.black};
    border-radius: 50%;
    color: #fff;
  }

  .react-datepicker__day--range-start {
    background-color: ${palette.black};
    border-radius: 50%;
    color: #fff;
  }

  .react-datepicker__day--range-end {
    background-color: ${palette.black};
    border-radius: 50%;
    color: #fff;
  }

  .react-datepicker__day--disabled {
    color: ${palette.gray_dd};
    cursor: pointer;

    &:hover {
      border: 0;
    }
  }
`;

const DatePicker: React.FC<ReactDatePickerProps> = ({ onChange, ...props }) => {
  return (
    <Container>
      <ReactDatePicker
        {...props}
        dateFormat='MM월 dd일'
        disabledKeyboardNavigation
        locale={ko}
        onChange={(date, event) => {
          if (date) {
            onChange(addHours(date as Date, 9), event);
          } else {
            onChange(null, event);
          }
        }}
      />
    </Container>
  );
};

export default DatePicker;
