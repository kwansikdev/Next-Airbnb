import React from 'react';
import styled from 'styled-components';
import { useSelector } from '../../store';

import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';

const Container = styled.div`
  z-index: 11;
`;

interface Props {
  closeModal: () => void;
}

const AuthModal: React.FC<Props> = ({ closeModal }) => {
  const authMode = useSelector((state) => state.auth.authMode);

  return (
    <Container>
      {authMode === 'signup' && <SignUpModal closeModal={closeModal} />}
      {authMode === 'login' && <LoginModal closeModal={closeModal} />}
    </Container>
  );
};

export default AuthModal;
