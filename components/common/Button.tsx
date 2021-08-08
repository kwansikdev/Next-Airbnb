import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

// 버튼 색상 구하기
const getButtonColor = (color: string, colorReverse: boolean) => {
  if (colorReverse) {
    switch (color) {
      case 'dark_cyan':
        return css`
          background-color: #fff;
          border: 2px solid ${palette.dark_cyan};
          color: ${palette.dark_cyan};
        `;
      default:
        return css`
          background-color: #fff;
          border: 2px solid ${palette.black};
          color: ${palette.black};
        `;
    }
  }

  switch (color) {
    case 'dark_cyan':
      return css`
        background-color: ${palette.dark_cyan};
        color: #fff;
      `;
    case 'bittersweet':
      return css`
        background-color: ${palette.bittersweet};
        color: #fff;
      `;
    case 'amaranth':
      return css`
        background-color: ${palette.amaranth};
        color: white;
      `;
    default:
      return css`
        background-color: #fff;
        border: 1px solid ${palette.gray_c4};
        color: ${palette.black};
      `;
  }
};

// 버튼 크기 구하기
const getButtonSize = (size: 'small' | 'midium') => {
  switch (size) {
    case 'midium':
      return css`
        height: 48px;
      `;
    case 'small':
      return css`
        height: 36px;
        font-size: 14px;
      `;
    default:
      return '';
  }
};

interface StyledButtonProps {
  width: string | undefined;
  colorReverse: boolean;
  size: 'small' | 'midium';
}

const Container = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 15px;
  border: 0;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 700;
  outline: none;
  cursor: pointer;

  width: ${(props) => props.width};

  ${(props) => getButtonColor(props.color || '', props.colorReverse)};
  ${(props) => getButtonSize(props.size)}

  svg {
    margin-right: 12px;
  }
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  color?: 'dark_cyan' | 'white' | 'bittersweet' | 'amaranth';
  width?: string;
  size?: 'small' | 'midium';
  colorReverse?: boolean;
  icon?: JSX.Element;
}

const Button: React.FC<Props> = ({
  children,
  color,
  width,
  size = 'midium',
  colorReverse = false,
  icon,
  ...props
}) => {
  return (
    <Container {...props} color={color} width={width} size={size} colorReverse={colorReverse}>
      {icon}
      {children}
    </Container>
  );
};

export default React.memo(Button);
