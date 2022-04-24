import styled from 'styled-components';

import { TABLET_WIDTH } from '../../../../constants/styles';

export const RightCol = styled.div`
  width: 100%;
  @media (min-width: ${TABLET_WIDTH}) {
    width: 35%;
  }
  height: fit-content;
`;

export const VerticalPair = styled.div`
  display: flex;
  flex-direction: column;
`;
