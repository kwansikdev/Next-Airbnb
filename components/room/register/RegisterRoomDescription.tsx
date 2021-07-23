import React from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import { useSelector } from '../../../store';
import { registerRoomActions } from '../../../store/registerRoom';
import palette from '../../../styles/palette';
import Textarea from '../../common/Textarea';
import RegisterRoomFooter from './RegisterRoomFooter';

const Container = styled.div`
  padding: 62px 30px 100px;

  h2 {
    margin-bottom: 56px;
    font-size: 19px;
    font-weight: 800;
  }

  h3 {
    margin-bottom: 6px;
    color: ${palette.gray_76};
    font-weight: bold;
  }

  .register-room-step-info {
    max-width: 400px;
    margin-bottom: 24px;
    font-size: 14px;
  }

  .register-room-description-wrapper {
    width: 430px;
    margin-bottom: 16px;
    font-size: 14px;
  }
`;

const RegisterRoomDescription = () => {
  const dispatch = useDispatch();
  const description = useSelector((state) => state.registerRoom.description);

  // 숙소 설명 변경 시
  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(registerRoomActions.setDescription(e.target.value));
  };
  return (
    <Container>
      <h2>게스트에게 숙소에 대해 설명해주세요.</h2>
      <h3>8단계</h3>
      <p className='register-room-step-info'>
        숙소의 장점, 특별한 편의 시설(예: 빠른 와이파이 또는 주차 시설)과 주변 지역의 매력을
        소개해주세요.
      </p>
      <div className='register-room-description-wrapper'>
        <Textarea value={description} onChange={onChangeDescription} />
      </div>
      <RegisterRoomFooter prevHref='/room/register/photo' nextHref='/room/register/title' />
    </Container>
  );
};

export default RegisterRoomDescription;
