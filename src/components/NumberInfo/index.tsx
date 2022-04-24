import { Icon } from '@fluentui/react';
import React from 'react';
import styled from 'styled-components';

import { COLORS, FONTS } from '../../constants/styles';
import { CurrencyPair } from '../../models';
import { Cost, SmallWrapper, Wrapper } from './styled';

type NumberInfoProps = Pick<CurrencyPair, 'cost' | 'percentChange'> & { symbol: string };

const roundSmallNumber = (input: number) => {
  const res = input.toFixed(4);
  if (res === '0.0000') {
    return '0.0001';
  }
  return res;
};

export const NumberInfo = ({ cost, symbol, percentChange }: NumberInfoProps) => {
  const iconName = percentChange > 0 ? 'SortUp' : 'SortDown';
  const Num = styled.p`
    ${FONTS.text}
  `;
  const numStyle = {
    color: percentChange > 0 ? COLORS.GREEN : COLORS.RED,
  };

  const percentage = (
    <SmallWrapper>
      <Num style={numStyle}>
        <Icon iconName={iconName} />
        {roundSmallNumber(percentChange)}%
      </Num>
    </SmallWrapper>
  );

  return (
    <Wrapper>
      <Cost>
        {cost.toFixed(4)} {symbol}
      </Cost>
      {percentage}
    </Wrapper>
  );
};
