import styled from 'styled-components';

import { GAP } from '../../constants/styles';

export const ColWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${GAP.xl};
  height: fit-content;
`;
