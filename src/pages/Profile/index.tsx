import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetUserInfoQuery } from '../../api/user';
import { ROUTES } from '../../App/routes';
import { Header } from '../../components/Header';
import { Layout } from '../../components/Layout';
import { HEADER_BUTTONS, HEADERS } from '../../constants/texts';
import { User } from '../../models';
import { camelize } from '../../utils/transforms';
import { UserStocks } from './containers/StocksInfo';
import { UserInfo } from './containers/UserInfo';

const buttons = [
  {
    text: HEADER_BUTTONS.newsList,
    link: ROUTES.news,
  },
];

export const ProfilePage = () => {
  const { data, isSuccess, isError } = useGetUserInfoQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate(ROUTES.login);
    }
  }, [isError]);

  return (
    <Layout
      header={<Header pageName={HEADERS.profile} buttons={buttons} />}
      left={isSuccess ? <UserInfo {...(camelize(data.data) as unknown as User)} /> : null}
      right={isSuccess ? <UserStocks /> : null}
    />
  );
};
