import styled from 'styled-components';

import { GAP } from '../../constants/styles';

export const Row = styled.div`
  padding-bottom: ${GAP.m};
`;

export const BtnRightRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  padding-top: ${GAP.m};
`;
