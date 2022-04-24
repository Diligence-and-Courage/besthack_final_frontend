import { Persona } from '@fluentui/react';
import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../App/routes';
import { NumberInfo } from '../../components/NumberInfo';
import { COLORS, GAP } from '../../constants/styles';
import { CardHeader, NameText } from '../../constants/texts';
import { CurrencyPair } from '../../models';
import { StyledAlignBottomRowSpaceBetween, StyledRowSpaceBetween } from '../../styled';

export const CurrencyCard = ({ baseCode, code, cost, percentChange }: CurrencyPair) => {
  return (
    <Link to={`/${ROUTES.currency.split('/')[1]}/${baseCode.currencyCode}-${code.currencyCode}`}>
      <StyledRowSpaceBetween>
        <CardHeader>{baseCode.currencyCode}</CardHeader>
        <Persona imageInitials={baseCode.symbol} initialsColor={COLORS.DEFAULT} />
      </StyledRowSpaceBetween>
      <StyledAlignBottomRowSpaceBetween gap={GAP.xl}>
        <NumberInfo cost={cost} symbol={code.symbol} percentChange={percentChange} />
        <NameText>
          {baseCode.name}, {baseCode.countryName}
        </NameText>
      </StyledAlignBottomRowSpaceBetween>
    </Link>
  );
};
