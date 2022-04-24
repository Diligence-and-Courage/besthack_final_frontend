import { Link as UILink } from '@fluentui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { HeaderText, HeaderWrapper, ModalWrapper, Wrapper } from './styled';

interface AuthModalProps {
  header: string;
  link?: {
    text: string;
    link: string;
  };
  children: React.ReactNode;
}

export const AuthModal = ({ header, link, children }: AuthModalProps) => {
  return (
    <Wrapper>
      <ModalWrapper>
        <HeaderWrapper>
          <HeaderText>{header}</HeaderText>
          {link ? (
            <UILink>
              <RouterLink to={link.link}>{link.text}</RouterLink>
            </UILink>
          ) : null}
        </HeaderWrapper>
        {children}
      </ModalWrapper>
    </Wrapper>
  );
};
