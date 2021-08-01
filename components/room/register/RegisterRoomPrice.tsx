import React from 'react';

import Input from '../../common/Input';
import RegisterRoomFooter from './RegisterRoomFooter';

import { useSelector } from '../../../store';

import styled from 'styled-components';
import palette from '../../../styles/palette';
import { useDispatch } from 'react-redux';
import { registerRoomActions } from '../../../store/registerRoom';
import { makeMoneyString } from '../../../lib/utils';

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
  const dispatch = useDispatch();

  const price = useSelector((state) => state.registerRoom.price);

  // 금액 변경 시
  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // input 값이 비워지면 price를 0으로 변경
    if (!input) {
      dispatch(registerRoomActions.setPrice(0));
    }

    const numberPrice = Number(input.replace(/,/g, ''));

    if (numberPrice !== 0) {
      dispatch(registerRoomActions.setPrice(numberPrice));
    }
  };

  return (
    <Container>
      <h2>숙소 요금 설정하기</h2>
      <h3>10단계</h3>
      <Input label='기본요금' value={makeMoneyString(String(price))} onChange={onChangePrice} />
      <RegisterRoomFooter prevHref='/room/register/title' nextHref='/room/register/date' />
    </Container>
  );
};
export default RegisterRoomPrice;
