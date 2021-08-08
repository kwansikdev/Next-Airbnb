import React from 'react';

import styled from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.div`
  &:after {
    display: block;
    content: '';
    clear: both;
  }

  .checkbox-label {
    position: relative;
    display: flex;
    align-content: center;
    height: 18px;
    margin-bottom: 24px;
    float: left;
    color: ${palette.gray_48};
    cursor: pointer;
    clear: both;
  }

  input[type='checkbox'] {
    width: 0;
    height: 0;
    margin: 0;
    border: 0;
    -webkit-appearance: none;
  }

  input[type='checkbox']:checked {
    margin: 0;
    border: 0;
    -webkit-appearance: none;
  }

  input[type='checkbox'] + input {
    display: none;
  }

  input[type='checkbox'] + span {
    display: inline-block;
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    margin-right: 8px;
  }

  input[type='checkbox'] + span::before {
    position: absolute;
    content: '';
    top: 0;
    display: inline-table;
    width: 18px;
    height: 18px;
    border: 1px solid ${palette.gray_b0};
    border-radius: 2px;
    box-sizing: border-box;
    background-color: #fff;
    cursor: pointer;
  }

  input[type='checkbox']:checked + span::before {
    position: absolute;
    content: '';
    display: inline-table;
    width: 18px;
    height: 18px;
    border: 0;
    border-radius: 2px;
    background-color: ${palette.dark_cyan};
    background-image: url('/static/svg/common/checkbox/checkbox_mark.svg');
    background-repeat: no-repeat;
    background-position: center;
  }
`;

interface Props {
  value?: string[];
  options?: string[];
  onChange: (selected: string[]) => void;
}

const CheckboxGroup: React.FC<Props> = ({ value = [], options = [], onChange }) => {
  return (
    <Container>
      {options.map((option) => (
        <label className='checkbox-label' key={option}>
          <input
            type='checkbox'
            checked={value?.includes(option)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.checked) {
                onChange([...value, option]);
              } else {
                onChange(value.filter((option_) => option_ !== option));
              }
            }}
          />
          <span />
          {option}
        </label>
      ))}
    </Container>
  );
};

export default CheckboxGroup;
