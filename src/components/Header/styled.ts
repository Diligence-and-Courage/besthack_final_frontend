import { PrimaryButton } from '@fluentui/react';
import styled from 'styled-components';

import { FONTS, GAP } from '../../constants/styles';

export const Wrapper = styled.div<{ justify: string }>`
  display: flex;
  flex-direction: row;
  gap: ${GAP.xl};
  justify-content: ${({ justify }) => justify};
  align-items: center;
  width: 100%;
  padding: ${GAP.xl} 5vw;
`;

export const HeaderButton = styled(PrimaryButton)`
  min-height: 5rem;
  ${FONTS.text};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${GAP.m};

  flex-wrap: wrap;
`;
