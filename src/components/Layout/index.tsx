import React from 'react';

import { Background, Columns, StyledLayout } from './styled';

interface LayoutProps {
  header: React.ReactNode;
  left: React.ReactNode;
  right?: React.ReactNode;
}

export const Layout = ({ header, left, right = null }: LayoutProps) => {
  return (
    <Background>
      {header}
      <StyledLayout>
        {right ? (
          <Columns>
            {left}
            {right}
          </Columns>
        ) : (
          left
        )}
      </StyledLayout>
    </Background>
  );
};
