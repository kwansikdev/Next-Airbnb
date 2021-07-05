import React from 'react';

import styled from 'styled-components';
import palette from '../../../styles/palette';

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

  .register-room-step-info {
    max-width: 400px;
    margin-bottom: 24px;
    font-size: 14px;
    word-break: keep-all;
  }
`;

const RegisterRoomBedrooms = () => {
  return (
    <Container>
      <h2>숙소에 얼마나 많은 인원이 숙발할 수 있나요?</h2>
      <h3>2단계</h3>
      <p className='register-room-step-info'>
        모든 게스트가 편안하게 숙박할 수 있도록 침대가 충분히 구비되어 있는지 확인하세요.
      </p>
    </Container>
  );
};

export default RegisterRoomBedrooms;
