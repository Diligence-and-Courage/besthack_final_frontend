import { Persona, PersonaSize } from '@fluentui/react';
import * as React from 'react';

import { CardUI } from '../../../../components/CardUI';
import { COLORS, GAP } from '../../../../constants/styles';
import { UserInfo as UserInfoProps } from '../../../../models';
import { StyledAlignBottomRowSpaceBetween } from '../../../../styled';
import { ColWrapper } from '../../styled';
import { Balance, Label } from './styled';

export const UserInfo = ({ firstName, lastName, email, balance }: UserInfoProps) => {
  return (
    <ColWrapper>
      <CardUI>
        <Persona
          text={`${firstName} ${lastName}`}
          secondaryText={email}
          size={PersonaSize.size120}
          initialsColor={COLORS.DEFAULT}
        />
        <StyledAlignBottomRowSpaceBetween gap={GAP.xl}>
          <Label>Balance</Label>
          <Balance>{balance.toFixed(2)} $</Balance>
        </StyledAlignBottomRowSpaceBetween>
      </CardUI>
    </ColWrapper>
  );
};
