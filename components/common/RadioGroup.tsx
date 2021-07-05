import React from 'react';

import styled, { css } from 'styled-components';
import palette from '../../styles/palette';
import WarningIcon from '../../public/static/svg/common/warning.svg';
import { useSelector } from '../../store';

const Container = styled.div<{ validateMode: boolean; isValid: boolean }>`
  .radio-label {
    margin-bottom: 32px;
    font-size: 16px;
    font-weight: 600;
    color: ${palette.gray_76};
  }

  .radio-list-wrapper {
    &:after {
      display: block;
      content: '';
      clear: both;
    }
  }

  label {
    float: left;
    margin-bottom: 24px;
    line-height: 1.2;
    font-size: 16px;
    clear: both;
    cursor: pointer;

    &:last-child {
      margin-bottom: 0;
    }
  }

  input[type='radio'] {
    position: relative;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin: 0 12px 0 0;
    border: 1px solid ${palette.gray_b0};
    border-radius: 50%;
    font-size: 16px;
    outline: none;
    clear: both;
    cursor: pointer;
    --webkit-appearance: none;

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
  }

  input[tpye='radio']:checked {
    background-color: ${palette.dark_cyan};
    border: 0;
  }

  input[tpye='radio']:checked:after {
    background-color: #fff;
    position: absolute;
    display: block;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 6px;
    height: 6px;
    margin: auto;
    border-radius: 50%;
  }

  .radio-description {
    display: block;
    margin-top: 5px;
    margin-left: 28px;
  }

  .radio-group-warning {
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

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: any;
  isValid?: boolean;
  errorMessage?: string;
  options?: { label: string; value: any; description?: string }[];
  onChange?: (value: any) => void;
}

const RadioGroup: React.FC<Props> = ({
  label,
  value,
  options = [],
  isValid,
  errorMessage = '옵션을 선택하세요',
  onChange,
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);

  return (
    <Container isValid={!!isValid} validateMode={validateMode}>
      <p className='radio-label'>{label}</p>
      <div className='radio-list-wrapper'>
        {options.map((option, index) => (
          <label key={index}>
            <input
              type='radio'
              checked={value === option.value}
              onChange={() => onChange && onChange(option.value)}
            />
            <span>
              {option.label}
              <span className='radio-description'>{option.description}</span>
            </span>
          </label>
        ))}
      </div>
      {validateMode && !isValid && (
        <div className='radio-group-warning'>
          <WarningIcon />
          <p>{errorMessage}</p>
        </div>
      )}
    </Container>
  );
};

export default React.memo(RadioGroup);
