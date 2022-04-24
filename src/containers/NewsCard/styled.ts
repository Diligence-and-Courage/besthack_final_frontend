import styled from 'styled-components';

import { FONTS, GAP, GRADIENT } from '../../constants/styles';

export const PlainText = styled.p`
  ${FONTS.text}
`;

export const LabelText = styled.div`
  ${FONTS.text};
  text-align: right;
  color: white;
  padding: 0 0.5rem;
  border-radius: 0.3rem;
  background: ${GRADIENT};
`;

export const NewsCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${GAP.m};
`;
