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
  goLogin: 'Login',
  goProfile: 'Profile',
  // goMain: 'All available stocks',
  goNewsList: 'NewsList',
  goCurrencyList: 'CurrencyList',
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
      <Blue>Enter</Blue>
    </Header>
  ),
  profile: (
    <Header>
      <Blue>site</Blue> Profile
    </Header>
  ),
};
