import React from 'react';
import Link from 'next/link';

import styled from 'styled-components';

import palette from '../styles/palette';
import AirbnbLogoIcon from '../public/static/svg/logo/logo.svg';
import AirbnbLogoTextIcon from '../public/static/svg/logo/logo_text.svg';

const Container = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  width: 100%;
  height: 80px;
  padding: 0 80px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;

  .header-logo-wrapper {
    display: flex;
    align-items: center;

    .header-logo {
      margin-right: 6px;
    }
  }

  .header-auth-buttons {
    .header-sign-up-button {
      background-color: #fff;
      height: 42px;
      margin-right: 8px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      cursor: pointer;
      outline: none;

      &:hover {
        background-color: ${palette.gray_f7};
      }
    }

    .header-login-button {
      background: #fff;
      height: 42px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
      cursor: pointer;
      outline: none;

      &:hover {
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
      }
    }
  }
`;

const Header: React.FC = () => {
  return (
    <>
      <Container>
        <Link href='/'>
          <a className='header-logo-wrapper'>
            <AirbnbLogoIcon className='header-logo' />
            <AirbnbLogoTextIcon />
          </a>
        </Link>
        <div className='header-auth-buttons'>
          <button type='button' className='header-sign-up-button'>
            회원가입
          </button>
          <button type='button' className='header-login-button'>
            로그인
          </button>
        </div>
      </Container>
    </>
  );
};

export default Header;
