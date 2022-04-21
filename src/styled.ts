import styled from 'styled-components';

export const StyledRow = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  gap: ${({ gap }) => gap};
`;
export const StyledElemRight = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
`;
export const StyledAlignBottomRow = styled.div<{ gap: string }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;

  gap: ${({ gap }) => gap};
`;
