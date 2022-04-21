import React from 'react';
import styled from 'styled-components';

import { FONTS, HEADER_GRADIENT, MOBILE_WIDTH } from './styles';

const Header = styled.h1`
  ${FONTS.header};
  @media (max-width: ${MOBILE_WIDTH}) {
    ${FONTS.mobileHeader}
  }
`;
const Blue = styled.span`
  ${HEADER_GRADIENT}
`;

export const HEADERS = {
  main: (
    <Header>
      <Blue>Main</Blue> page
    </Header>
  ),
};
