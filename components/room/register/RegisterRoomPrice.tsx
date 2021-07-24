import React from 'react';

import Input from '../../common/Input';
import RegisterRoomFooter from './RegisterRoomFooter';

import { useSelector } from '../../../store';

import styled from 'styled-components';
import palette from '../../../styles/palette';

const Container = styled.div`
  width: 445px;
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

const RegisterRoomPrice: React.FC = () => {
  const price = useSelector((state) => state.registerRoom.price);

  return (
    <Container>
      <h2>숙소 요금 설정하기</h2>
      <h3>10단계</h3>
      <Input label='기본요금' value={String(price)} />
      <RegisterRoomFooter prevHref='/room/register/title' nextHref='/room/register/date' />
    </Container>
  );
};
export default RegisterRoomPrice;
