import React from 'react';
import { useSelector } from '../../store';

import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

import WarningIcon from '../../public/static/svg/common/warning.svg';

const normalSelectorStyle = css`
  width: 100%;
  height: 46px;

  select {
    background-color: #fff;
    width: 100%;
    height: 100%;
    padding: 0 11px;
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none;
    background-image: url('/static/svg/common/selector/selector_down_arrow.svg');
    background-position: right 11px center;
    background-repeat: no-repeat;
    font-size: 16px;

    &:focus {
      border-color: ${palette.dark_cyan};
    }
  }
`;

const RegisterSelectorStyle = css`
  width: 100%;

  label {
    position: relative;
  }

  span {
    display: block;
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 600;
    color: ${palette.gray_76};
  }

  select {
    width: 100%;
    height: 56px;
    padding: 0 14px 0 12px;
    background-image: url('/static/svg/common/selector/selector_down_arrow.svg');
    background-position: right 14px center;
    background-repeat: no-repeat;
    border-radius: 8px;
    border: 1px solid ${palette.gray_b0};
    appearance: none;
    outline: none;
    --webkit-appearance: none;
  }
`;

interface SelectorContainerProps {
  type: 'register' | 'normal';
  isValid: boolean;
  validateMode: boolean;
}

const Container = styled.div<SelectorContainerProps>`
  ${({ type }) => type === 'normal' && normalSelectorStyle};
  ${({ type }) => type === 'register' && RegisterSelectorStyle};

  select {
    ${({ validateMode, isValid }) => {
      if (validateMode) {
        if (!isValid) {
          return css`
            border-color: ${palette.tawny};
            background-color: ${palette.snow};
          `;
        }

        return css`
          border-color: ${palette.dark_cyan};
        `;
      }

      return undefined;
    }}

    &:disabled {
      background-color: ${palette.gray_f7};
      background-image: url('/static/svg/common/selector/disabled_register_selector_down_arrow.svg');
      border-color: ${palette.gray_e5};
      color: ${palette.gray_e5};
      cursor: not-allowed;
    }
  }

  .selector-warning {
    display: flex;
    align-items: center;
    margin-top: 8px;

    svg {
      margin-right: 4px;
    }

    p {
      font-size: 12px;
      color: ${palette.davidson_orange};
    }
  }
`;

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  type?: 'register' | 'normal';
  value?: string;
  disabledOptions?: string[];
  label?: string;
  options?: string[];
  isValid?: boolean;
  errorMessage?: string;
  useValidation?: boolean;
}

const Selector: React.FC<Props> = ({
  type = 'normal',
  disabledOptions = [],
  label,
  options = [],
  isValid,
  errorMessage = '옵션을 선택하세요.',
  useValidation = true,
  ...props
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);

  return (
    <Container isValid={!!isValid} validateMode={useValidation && validateMode} type={type}>
      <label>
        {label && <span>{label}</span>}
        <select {...props}>
          {disabledOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      {useValidation && validateMode && !isValid && (
        <div className='selector-warning'>
          <WarningIcon />
          <p>{errorMessage}</p>
        </div>
      )}
    </Container>
  );
};

export default React.memo(Selector);
