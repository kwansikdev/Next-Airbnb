import React from 'react';
import DatePicker from '../../common/DatePicker';

import styled from 'styled-components';
import palette from '../../../styles/palette';
import { useSelector } from '../../../store';
import { useDispatch } from 'react-redux';
import { registerRoomActions } from '../../../store/registerRoom';

const Container = styled.div`
  padding: 62px 30px 100px;

  h2 {
    margin-bottom: 56px;
    font-size: 19px;
    font-weight: 800;
  }

  h3 {
    margin-bottom: 6px;
    font-weight: bold;
    color: ${palette.gray_76};
  }
`;

const RegisterRoomDate: React.FC = () => {
  const dispatch = useDispatch();

  const startDate = useSelector((state) => state.registerRoom.startDate);

  const onChangeStartDate = (date: Date | null) => {
    dispatch(registerRoomActions.setStartDate(date ? date.toISOString() : null));
  };

  return (
    <Container>
      <h2>예약 가능 여부 설정하기</h2>
      <h3>11단계</h3>
      <DatePicker selected={startDate ? new Date(startDate) : null} onChange={onChangeStartDate} />
    </Container>
  );
};

export default RegisterRoomDate;
