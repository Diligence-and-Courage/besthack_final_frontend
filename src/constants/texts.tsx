import React from 'react';
import styled from 'styled-components';

import { COLORS, FONTS, HEADER_GRADIENT, MOBILE_WIDTH } from './styles';

export const Header = styled.h1`
  ${FONTS.header};
  @media (max-width: ${MOBILE_WIDTH}) {
    ${FONTS.mobileHeader}
  }
`;
const Blue = styled.span`
  ${HEADER_GRADIENT}
`;

export const CardHeader = styled.h4`
  ${FONTS.localHeaderBold}
`;

export const SmallCardHeader = styled.h4`
  ${FONTS.localHeader}
  line-height: 1.8rem;
`;

export const PlainGreyText = styled.p`
  ${FONTS.text};
  color: ${COLORS.GREY_TEXT};
`;

export const NameText = styled.p`
  ${FONTS.smallText}
  text-align: right;
`;

export const HEADER_BUTTONS = {
  login: 'Login',
  profile: 'Profile',
  newsList: 'News List',
  currencyList: 'Currency List',
};

export const HEADERS = {
  news: (
    <Header>
      <Blue>site</Blue> News
    </Header>
  ),
  currency: (name: string, base: string) => (
    <Header>
      <Blue>{name}</Blue> / {base}
    </Header>
  ),
  currencyList: (
    <Header>
      <Blue>Currency</Blue> info
    </Header>
  ),
  newsList: (
    <Header>
      <Blue>Hot</Blue> news
    </Header>
  ),
  auth: (
    <Header>
      <Blue>Log in</Blue>
    </Header>
  ),
  profile: (
    <Header>
      <Blue>Profile</Blue>
    </Header>
  ),
  signup: (
    <Header>
      <Blue>Singup</Blue>
    </Header>
  ),
};
