import React, { memo } from 'react';

import { useHelloQuery } from '../../api/hello';
import { Header } from '../../components/Header';
import { Layout } from '../../components/Layout';
import { HEADERS } from '../../constants/texts';

const MainPage = () => {
  const { isError } = useHelloQuery();

  return <Layout header={<Header pageName={HEADERS.news} />} left={isError && <div>Error</div>} />;
};

export default memo(MainPage);
