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
`;

const RegisterRoomDate: React.FC = () => {
  return (
    <Container>
      <h2>예약 가능 여부 설정하기</h2>
      <h3>11단계</h3>
    </Container>
  );
};

export default RegisterRoomDate;
