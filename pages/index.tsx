import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 12px;
  color: gray;
`;

const index: NextPage = () => {
  return (
    <>
      <Container>Hello World!</Container>
    </>
  );
};

export default index;
