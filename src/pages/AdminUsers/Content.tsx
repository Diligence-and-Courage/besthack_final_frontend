import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetAllUsersQuery } from '../../api';
import { ROUTES } from '../../App/routes';
import { UserInfo } from '../../models';
import { camelize } from '../../utils/transforms';
import { UserCard } from './components/UserCard';

export const AdminUserContent = () => {
  const { data, isError, isLoading } = useGetAllUsersQuery();
  const navigate = useNavigate();

  if (isError) {
    navigate(ROUTES.news);
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      {camelize(data.data)
        .sort((a: UserInfo, b: UserInfo) => a.id - b.id)
        .map((el: UserInfo) => (
          <UserCard key={el.id} {...el} />
        ))}
    </div>
  );
};
