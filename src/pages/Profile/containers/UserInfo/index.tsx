import { Persona, PersonaSize, PrimaryButton } from '@fluentui/react';
import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetUserInfoQuery, useLogoutUserMutation } from '../../../../api';
import { ROUTES } from '../../../../App/routes';
import { CardUI } from '../../../../components/CardUI';
import { COLORS, GAP } from '../../../../constants/styles';
import { UserInfo as UserInfoProps } from '../../../../models';
import { StyledAlignBottomRowSpaceBetween } from '../../../../styled';
import { ColWrapper } from '../../styled';
import { Balance, Label } from './styled';

export const UserInfo = ({ email, balance }: UserInfoProps) => {
  const [logout, { isSuccess }] = useLogoutUserMutation();
  const { refetch } = useGetUserInfoQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      refetch();
      navigate(ROUTES.news);
    }
  }, [isSuccess]);

  return (
    <ColWrapper>
      <CardUI>
        <Persona secondaryText={email} size={PersonaSize.size120} initialsColor={COLORS.DEFAULT} />
        <StyledAlignBottomRowSpaceBetween gap={GAP.xl}>
          <Label>Balance</Label>
          <Balance>{balance.toFixed(2)} $</Balance>
        </StyledAlignBottomRowSpaceBetween>
        <PrimaryButton
          onClick={() => {
            logout();
          }}
        >
          Logout
        </PrimaryButton>
      </CardUI>
    </ColWrapper>
  );
};
