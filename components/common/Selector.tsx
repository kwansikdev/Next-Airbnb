import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from '../../store';
import palette from '../../styles/palette';

const Container = styled.div<{ isValid: boolean; validateMode: boolean }>`
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

  ${({ isValid, validateMode }) =>
    validateMode &&
    css`
      select {
        border-color: ${isValid ? palette.dark_cyan : palette.tawny}
        background-color: ${isValid ? '#fff' : palette.snow}
      }
  `}
`;

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  disabledOptions?: string[];
  value?: string;
  isValid: boolean;
}

const Selector: React.FC<Props> = ({ options = [], disabledOptions = [], isValid, ...props }) => {
  const validateMode = useSelector((state) => state.common.validateMode);

  return (
    <Container isValid={isValid} validateMode={validateMode}>
      <select {...props}>
        {disabledOptions.map((option, index) => (
          <option key={index} value={option} disabled>
            {option}
          </option>
        ))}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default React.memo(Selector);
