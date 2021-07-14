import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

const normalButtonStyle = css`
  background-color: ${palette.bittersweet};
  width: 100%;
  height: 48px;
  padding: 0 15px;
  border: 0;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  color: ${palette.gray_48};
  font-size: 18px;
  font-weight: 700;
`;

const RegisterButtonStyle = css`
  background-color: #fff;
  width: 161px;
  height: 45px;
  border: 1px solid ${palette.gray_c4};
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  color: ${palette.gray_48};
  font-size: 18px;
  font-weight: 700;
`;

const Container = styled.button<{ styleType: 'normal' | 'register' }>`
  ${({ styleType }) => (styleType === 'normal' ? normalButtonStyle : RegisterButtonStyle)}
  ${(props) => getButtonColor(props.color || '')};
`;

// 버튼 색상 구하기
const getButtonColor = (color: string) => {
  switch (color) {
    case 'dark_cyan':
      return css`
        /* border: 2px solid ${palette.dark_cyan}; */
        color: #fff;
        background-color: ${palette.dark_cyan};
      `;
    case 'white':
      return css`
        background-color: #fff;
      `;
    default:
      return css`
        background-color: ${palette.bittersweet};
      `;
  }
};

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: 'dark_cyan' | 'white';
  styleType?: 'normal' | 'register';
}

const Button: React.FC<Props> = ({ children, color, styleType = 'normal', ...props }) => {
  return (
    <Container {...props} color={color} styleType={styleType}>
      {children}
    </Container>
  );
};

export default React.memo(Button);
