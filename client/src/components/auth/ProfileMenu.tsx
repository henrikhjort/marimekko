"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Menu, rem } from '@mantine/core';
import {
  IconChevronDown,
  IconUser,
  IconLogout,
  IconLogin,
} from '@tabler/icons-react';

import { useAuth } from '@/context/AuthContext';

const ProfileMenu: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user])

  const menuTitle = () => {
    if (loggedIn && user) {
      return `${user.firstName}`;
    }
    return 'Login';
  }

  /**
   * Render dropdown menu items for logged in user
   * 
   * @returns Profile menu content
   */
  const loggedInItems = () => {
    return (
      <>
        <Menu.Item
          leftSection={
            <IconUser
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
            }
        >
          Profile
        </Menu.Item>
        <Menu.Item
          onClick={logout}
          leftSection={
            <IconLogout
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
            }
        >
          Logout
        </Menu.Item>
      </>
    );
  }

  function renderLoggedInButton() {
    return (
      <Button
        rightSection={
          <IconChevronDown style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        }
        pr={12}
        >
        <span className="text-brand-white">{menuTitle()}</span>
      </Button>
    )
  }

  function renderLoggedOutButton() {
    return (
      <Button
        onClick={() => router.push('/login')}
        pr={12}
        rightSection={
          <IconLogin style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        }
        >
          
        <span className="text-brand-white">Login</span>
      </Button>
    )
  }

  return (
    <div className="absolute top-1 right-1">
      <Menu
        transitionProps={{ transition: 'pop-top-right' }}
        position="bottom-end"
        width={100}
        withinPortal>
        <Menu.Target>
          {loggedIn ? renderLoggedInButton() : renderLoggedOutButton()}
        </Menu.Target>
        {loggedIn && (
          <Menu.Dropdown>
            {loggedInItems()}
          </Menu.Dropdown>
        )}
      </Menu>
    </div>
  );
};

export default ProfileMenu;
