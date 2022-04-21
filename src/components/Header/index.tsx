import React from 'react';
import { Link } from 'react-router-dom';

import { ButtonWrapper, HeaderButton, Wrapper } from './styled';

interface HeaderProps {
  pageName: React.ReactNode;
  buttons?: {
    text: string;
    link: string;
  }[];
}

export const Header = ({ pageName, buttons = [] }: HeaderProps) => {
  const justify = buttons.length > 0 ? 'space-between' : 'center';

  return (
    <Wrapper justify={justify}>
      {pageName}
      <ButtonWrapper>
        {buttons.map(({ text, link }, index) => {
          return (
            <Link key={index} to={link}>
              <HeaderButton text={text} />
            </Link>
          );
        })}
      </ButtonWrapper>
    </Wrapper>
  );
};
