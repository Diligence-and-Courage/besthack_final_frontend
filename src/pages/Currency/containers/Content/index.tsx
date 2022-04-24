import { Persona } from '@fluentui/react';
import React from 'react';

import { CardUI } from '../../../../components/CardUI';
import { NumberInfo } from '../../../../components/NumberInfo';
import { COLORS, GAP } from '../../../../constants/styles';
import { CardHeader } from '../../../../constants/texts';
import { CurrencyPair } from '../../../../models';
import { StyledAlignCenterRow } from '../../../../styled';
import { Col } from '../../styled';
import { LeftCol, NextLogoCol } from './styled';

export const Content = ({ code, baseCode, cost, percentChange }: CurrencyPair) => {
  return (
    <LeftCol>
      <CardUI>
        <Col>
          <StyledAlignCenterRow gap={GAP.m}>
            <CardHeader>
              {code.name} / {baseCode.name}
            </CardHeader>
          </StyledAlignCenterRow>
          <NextLogoCol>
            <Persona imageInitials={baseCode.symbol} initialsColor={COLORS.DEFAULT} />
            <NumberInfo cost={cost} symbol={baseCode.symbol} percentChange={percentChange} />
          </NextLogoCol>
          {/* <SingleStock /> */}
        </Col>
      </CardUI>
    </LeftCol>
  );
};
