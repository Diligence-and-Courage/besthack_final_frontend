import { PrimaryButton } from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';
import React from 'react';

import { CardUI } from '../../../../components/CardUI';
import { Confirm } from '../../../../containers/Confirm';
import { AppResponse, UserInfo } from '../../../../models';
import { StyledRowSpaceBetween } from '../../../../styled';
import { Col, LocalHeader, SmallText, SmallTextRight } from '../../styled';
import { RightCol, VerticalPair } from './styled';

interface RightPanelProps {
  user: AppResponse<UserInfo>;
  isSuccess: boolean;
  isError: boolean;

  symbol: string;
  stockAmount: number;
  stockCost: number;
}

const BUTTON_TEXT = {
  buy: 'Buy',
  ceil: 'Ceil',
};

export const RightPanel = ({
  user,
  isError,
  isSuccess,
  stockAmount,
  stockCost,
  symbol,
}: RightPanelProps) => {
  const headerText = isError ? 'Log in to trade' : 'In your portfolio';
  const infoBlock =
    isSuccess && user.data ? (
      <StyledRowSpaceBetween>
        <VerticalPair>
          <LocalHeader>{stockAmount} stocks</LocalHeader>
          <SmallText>You have</SmallText>
        </VerticalPair>
        <VerticalPair>
          <LocalHeader>{stockCost.toFixed(2)} $</LocalHeader>
          <SmallTextRight>cost</SmallTextRight>
        </VerticalPair>
      </StyledRowSpaceBetween>
    ) : null;
  const buttonsDisabled = isError
    ? {
        buy: true,
        ceil: true,
      }
    : {
        buy: false,
        ceil: true,
      };
  if (isSuccess && stockAmount > 0) {
    buttonsDisabled.ceil = false;
  }

  const [isBuyCalloutVisible, { toggle: toggleIsBuyCalloutVisible }] = useBoolean(false);
  const buttonBuyId = useId('callout-buy-button');

  const [isSeilCalloutVisible, { toggle: toggleIsSeilCalloutVisible }] = useBoolean(false);
  const buttonSeilId = useId('callout-ceil-button');

  return (
    <RightCol>
      <CardUI>
        <Col>
          <LocalHeader>{headerText}</LocalHeader>
          {infoBlock}
          <PrimaryButton
            disabled={buttonsDisabled.buy}
            id={buttonBuyId}
            onClick={toggleIsBuyCalloutVisible}
            text={isBuyCalloutVisible ? 'Refuse' : `${BUTTON_TEXT.buy} ${symbol}`}
          >{`${BUTTON_TEXT.buy} ${symbol}`}</PrimaryButton>
          {isBuyCalloutVisible && (
            <Confirm
              id={symbol}
              question={`Buy ${symbol}`}
              buttonId={buttonBuyId}
              toggleIsCalloutVisible={toggleIsBuyCalloutVisible as never}
              callback="buy"
            />
          )}
          <PrimaryButton
            disabled={buttonsDisabled.ceil}
            id={buttonSeilId}
            onClick={toggleIsSeilCalloutVisible}
            text={isSeilCalloutVisible ? 'Refuse' : `${BUTTON_TEXT.ceil} ${symbol}`}
          >{`${BUTTON_TEXT.buy} ${symbol}`}</PrimaryButton>
          {isSeilCalloutVisible && (
            <Confirm
              id={symbol}
              question={`Seil ${symbol}`}
              buttonId={buttonSeilId}
              toggleIsCalloutVisible={toggleIsSeilCalloutVisible as never}
              callback="ceil"
            />
          )}
        </Col>
      </CardUI>
    </RightCol>
  );
};
