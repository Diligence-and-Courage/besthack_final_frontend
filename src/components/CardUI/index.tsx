import React from 'react';

import { Wrapper } from './styled';

interface CardUIProps {
  children: React.ReactNode;
  styles?: Record<string, string>;
}

export const CardUI = ({ children, styles = {} }: CardUIProps) => {
  return <Wrapper styles={styles}>{children}</Wrapper>;
};
