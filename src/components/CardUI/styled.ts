import styled from 'styled-components';

import { DEPTH, GAP } from '../../constants/styles';

export const Wrapper = styled.div<{ styles: Record<string, string> }>`
  padding: ${GAP.xl};
  box-shadow: ${DEPTH.s};
  background-color: white;
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  ${({ styles }) => styles}
`;
