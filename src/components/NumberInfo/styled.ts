import styled from 'styled-components';

import { FONTS, GAP } from '../../constants/styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${GAP.s};
  min-width: fit-content;
`;

export const Cost = styled.p`
  ${FONTS.text}
`;

export const SmallWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;
