import styled from 'styled-components';

import { GAP, TABLET_WIDTH } from '../../../../constants/styles';

export const LeftCol = styled.div`
  width: 100%;
  @media (min-width: ${TABLET_WIDTH}) {
    width: 65%;
  }
`;

export const NextLogoCol = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: space-between;
  align-items: stretch;
  justify-items: stretch;
  height: 100%;
  gap: ${GAP.m};
`;
