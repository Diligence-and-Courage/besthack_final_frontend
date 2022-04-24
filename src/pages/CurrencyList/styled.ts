import styled from 'styled-components';

import { GAP, MOBILE_WIDTH, TABLET_WIDTH } from '../../constants/styles';

export const CardsWrapper = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: ${MOBILE_WIDTH}) {
    flex-direction: column;
    gap: ${GAP.l};
  }
  @media (min-width: ${MOBILE_WIDTH}) {
    flex-wrap: wrap;
    gap: 2%;
    row-gap: ${GAP.l};
  }
`;

export const CardWrapper = styled.div`
  @media (min-width: ${TABLET_WIDTH}) {
    width: 49%;
  }
  @media (max-width: ${TABLET_WIDTH}) {
    width: 100%;
  }
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${GAP.xl};
`;
