import { Callout, DefaultButton, Text, TextField } from '@fluentui/react';
import React, { useState } from 'react';

import { useGetUserInfoQuery } from '../../api';
import { useAddCurrencyMutation, useDeleteCurrencyMutation } from '../../api/currency';
import { Padding } from './styled';

interface ConfirmProps {
  id: string;
  question: string;
  buttonId: string;
  toggleIsCalloutVisible: never;

  callback: 'buy' | 'ceil' | 'getMoney';
}

function isNumeric(str: string) {
  if (typeof str !== 'string') return false; // we only process strings!
  return (
    !Number.isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !Number.isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

export const Confirm = ({
  id,
  question,
  buttonId,
  toggleIsCalloutVisible,
  callback,
}: ConfirmProps) => {
  const [buy, buyResult] = useAddCurrencyMutation();
  const [seil, seilResult] = useDeleteCurrencyMutation();

  const action = callback === 'buy' ? buy : seil;
  const { isSuccess, data } = useGetUserInfoQuery();
  if (!isSuccess) {
    return null;
  }
  const userId = data.data.id;

  const [count, setCount] = useState<number>(1);

  const onChangeTextFieldValue = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      if (!newValue || isNumeric(newValue)) {
        setCount(Number(newValue) || 0);
      }
    },
    [],
  );

  const stockCallback = () =>
    action({
      userId,
      id,
      count,
    });

  const isError = buyResult.isError || seilResult.isError;

  return (
    <Callout
      gapSpace={0}
      target={`#${buttonId}`}
      onDismiss={toggleIsCalloutVisible}
      setInitialFocus
    >
      <Padding>
        <Text block variant="xLarge">
          {question}
        </Text>
        <Text block variant="small">
          Are you shure?
        </Text>
        <TextField
          style={{ padding: '4px' }}
          onChange={onChangeTextFieldValue}
          value={String(count)}
          errorMessage={isError ? 'Something went wrong. Check if you have enough money' : null}
        />
        /<DefaultButton onClick={stockCallback}>Confirm</DefaultButton>
      </Padding>
    </Callout>
  );
};
