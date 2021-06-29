import React, { useEffect, useMemo, useState } from 'react';

import styled from 'styled-components';

import palette from '../../styles/palette';

const Container = styled.form`
  background: #fff;
  width: 568px;
  padding: 32px;
  z-index: 11;
`;

interface Props {
  closeModal: () => void;
}

const SignUpModal: React.FC<Props> = ({ closeModal }) => {
  return <Container>Sign up</Container>;
};

export default SignUpModal;
