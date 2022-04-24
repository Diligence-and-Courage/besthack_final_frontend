import { Dropdown, DropdownMenuItemType, IDropdownOption, PrimaryButton } from '@fluentui/react';
import React, { FC, useEffect } from 'react';
import styled from 'styled-components';

import {
  useBlockUserMutation,
  useGetAllUsersQuery,
  useSetUserRoleMutation,
  useUnblockUserMutation,
} from '../../../../api';
import { CardUI } from '../../../../components/CardUI';
import { Role, UserInfo } from '../../../../models';

const StyledCard = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 1rem;
`;

const AttemptInfo = styled.div`
  margin: 0 1.5rem;
`;

export const UserCard: FC<UserInfo> = ({ id, role, attempts, isBlocked, email }) => {
  const [block, { isLoading: isBlockLoading }] = useBlockUserMutation();
  const [unblock, { isLoading: isUnblockLoading }] = useUnblockUserMutation();
  const [setRole, { isLoading: isRoleLoading }] = useSetUserRoleMutation();
  const { refetch } = useGetAllUsersQuery();

  const onBlockClick = () => {
    block({ userId: id });
  };

  const onUnblockClick = () => {
    unblock({ userId: id });
  };

  useEffect(() => {
    if (isUnblockLoading || isBlockLoading || isRoleLoading) {
      refetch();
    }
  }, [isUnblockLoading, isBlockLoading, isRoleLoading]);

  const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>({
    key: role,
    text: role,
  });

  const dropdownControlledExampleOptions = [
    { key: 'fruitsHeader', text: 'Role', itemType: DropdownMenuItemType.Header },
    { key: 'common', text: 'common' },
    { key: 'user', text: 'user' },
    { key: 'admin', text: 'admin' },
  ];

  const onDropdownChange = (_: any, item: IDropdownOption): void => {
    setSelectedItem(item);
    setRole({
      userId: id,
      role: item.key as Role,
    });
  };

  return (
    <CardUI styles={{ marginBottom: '30px' }}>
      <StyledCard>
        <Info>
          <Dropdown
            selectedKey={selectedItem ? selectedItem.key : undefined}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={onDropdownChange}
            placeholder="Select an option"
            options={dropdownControlledExampleOptions}
            styles={{
              dropdown: { width: 100 },
            }}
            style={{
              marginRight: '1.5rem',
            }}
          />
          {email}
        </Info>

        <Info>
          {isBlocked && <PrimaryButton onClick={onUnblockClick}>Unblock User</PrimaryButton>}
          {!isBlocked && <PrimaryButton onClick={onBlockClick}>Block User</PrimaryButton>}
          <AttemptInfo>Login attempts: {attempts}</AttemptInfo>
        </Info>
      </StyledCard>
    </CardUI>
  );
};
