import React from 'react';
import styled, { css } from 'styled-components';
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
  ${(props) => getButtonColor(props.color || '')};
`;

const getButtonColor = (color: string) => {
  switch (color) {
    case 'dark_cyan':
      return css`
        background-color: ${palette.dark_cyan};
      `;
    default:
      return css`
        background-color: ${palette.bittersweet};
      `;
  }
};

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: 'dark_cyan';
}

const Button: React.FC<Props> = ({ children, color, ...props }) => {
  return (
    <Container {...props} color={color}>
      {children}
    </Container>
  );
};

export default React.memo(Button);
