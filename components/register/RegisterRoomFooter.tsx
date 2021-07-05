import React, { useEffect } from 'react';
import Link from 'next/link';

import Button from '../common/Button';

import styled from 'styled-components';
import palette from '../../styles/palette';
import BackArrowIcon from '../../public/static/svg/register/register_room_footer_back_arrow.svg';
import useValidateMode from '../../hooks/useValidateMode';

const Container = styled.footer`
  background-color: #fff;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 548px;
  height: 82px;
  padding: 14px 30px 20px;
  border-top: 1px solid ${palette.gray_dd};
  z-index: 10;

  .register-room-footer-back {
    display: flex;
    align-items: center;
    color: ${palette.dark_cyan};
    cursor: pointer;

    svg {
      margin-right: 8px;
    }
  }
`;

interface Props {
  prevHref?: string;
  nextHref?: string;
  isValid?: boolean;
}

const RegisterRoomFooter: React.FC<Props> = ({ prevHref, nextHref, isValid }) => {
  const { setValidateMode } = useValidateMode();

  const onClickNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isValid) {
      e.preventDefault();
      setValidateMode(true);
    }
  };

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  return (
    <Container>
      <Link href={prevHref || ''}>
        <a className='register-room-footer-back'>
          <BackArrowIcon />
        </a>
      </Link>
      <Link href={nextHref || ''}>
        <a>
          <Button color='dark_cyan' onClick={onClickNext}>
            계속
          </Button>
        </a>
      </Link>
    </Container>
  );
};

export default RegisterRoomFooter;
