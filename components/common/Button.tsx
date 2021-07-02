import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.button`
  background-color: ${palette.bittersweet};
  width: 100%;
  height: 48px;
  border: 0;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  font-weight: 800;
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default React.memo(Button);
