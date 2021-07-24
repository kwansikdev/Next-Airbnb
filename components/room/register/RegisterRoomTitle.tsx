import React from 'react';
import { useDispatch } from 'react-redux';

import Input from '../../common/Input';

import { useSelector } from '../../../store';
import { registerRoomActions } from '../../../store/registerRoom';

import styled from 'styled-components';
import palette from '../../../styles/palette';
import RegisterRoomFooter from './RegisterRoomFooter';

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

const RegisterRoomTitle: React.FC = () => {
  const dispatch = useDispatch();

  const title = useSelector((state) => state.registerRoom.title);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setTitle(e.target.value));
  };

  return (
    <Container>
      <h2>숙소의 제목을 만드세요.</h2>
      <h3>9단계</h3>
      <div className='regisdter-toom-title-wrapper'>
        <Input
          label='숙소의 특징과 장점을 강조하는 제목으로 게스트의 관심을 끌어보세요.'
          value={title}
          onChange={onChangeTitle}
        />
      </div>
      <RegisterRoomFooter prevHref='/room/register/description' nextHref='/room/register/price' />
    </Container>
  );
};

export default RegisterRoomTitle;
