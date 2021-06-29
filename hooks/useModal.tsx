import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-background {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.75);
    width: 100%;
    height: 100%;
    z-index: 10;
  }
`;

const useModal = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const openModal = () => {
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  interface PortalProps {
    children: React.ReactNode;
  }

  const ModalPortal: React.FC<PortalProps> = ({ children }) => {
    const ref = useRef<Element | null>();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
      setMounted(true);

      if (document) {
        const dom = document.querySelector('#root-modal');
        ref.current = dom;
      }
    }, []);

    if (ref.current && mounted && modalOpened) {
      return createPortal(
        <Container>
          <div className='modal-background' role='presentation' onClick={closeModal} />
          {children}
        </Container>,
        ref.current,
      );
    }

    return null;
  };

  return { openModal, closeModal, ModalPortal };
};

export default useModal;
