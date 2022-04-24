import styled from 'styled-components';

import { FONTS, GAP } from '../../constants/styles';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${GAP.l};
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${GAP.l};
`;

export const LocalHeader = styled.h2`
  ${FONTS.localHeader};
`;
export const SmallText = styled.p`
  ${FONTS.smallText};
`;
export const SmallTextRight = styled.p`
  ${FONTS.smallText};
  text-align: right;
`;
