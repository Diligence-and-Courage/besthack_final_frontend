import styled from 'styled-components';

import { FONTS, MOBILE_WIDTH } from '../../../../constants/styles';

export const Label = styled.h4`
  ${FONTS.text}
`;
export const Balance = styled.h2`
  ${FONTS.header};
  @media (max-width: ${MOBILE_WIDTH}) {
    ${FONTS.mobileHeader}
  }
`;
