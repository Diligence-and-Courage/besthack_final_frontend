import styled from 'styled-components';

import { DEPTH, FONTS, GAP, MOBILE_WIDTH } from '../../constants/styles';

export const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
export const HeaderText = styled.h2`
  ${FONTS.localHeader}
`;

export const ModalWrapper = styled.div`
  @media (min-width: ${MOBILE_WIDTH}) {
    width: 360px;
  }
  @media (max-width: ${MOBILE_WIDTH}) {
    width: 100%;
  }

  padding: ${GAP.xl};
  max-width: 360px;
  box-shadow: ${DEPTH.l};
  background-color: white;

  display: flex;
  flex-direction: column;
  gap: ${GAP.m};
`;
