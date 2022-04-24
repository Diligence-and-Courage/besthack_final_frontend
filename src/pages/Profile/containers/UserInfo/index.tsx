import { DefaultButton, Persona, PersonaSize } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import * as React from 'react';

import { CardUI } from '../../../../components/CardUI';
import { COLORS, GAP } from '../../../../constants/styles';
import { UserInfo as UserInfoProps } from '../../../../models';
import { StyledAlignBottomRowSpaceBetween, StyledElemRight } from '../../../../styled';
import { ColWrapper } from '../../styled';
import { Balance, Label } from './styled';

export const UserInfo = ({ firstName, lastName, email, balance }: UserInfoProps) => {
  // const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const buttonId = useId('callout-button');

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
        <StyledElemRight>
          <DefaultButton id={buttonId} onClick={toggleIsCalloutVisible}>
            Fill
          </DefaultButton>
        </StyledElemRight>
      </CardUI>
    </ColWrapper>
  );
};
