import { CookieName, CookiesConfig } from '@/config/cookies';
import { IPermissions } from '@/modules/core';

import { useAuthStore } from '../store';

type AuthenticateParams = {
  userId: string;
  avatar: string;
  account: string;
  accessToken: string;
  permissions: IPermissions;
  singleWorkspace: string;
};

const useAuth = () => {
  const store = useAuthStore();

  const authenticate = (params: AuthenticateParams) => {
    CookiesConfig.setCookies([
      {
        name: CookieName.ACCESS_TOKEN,
        value: params.accessToken,
      },
      {
        name: CookieName.ADDRESS,
        value: params.account,
      },
      {
        name: CookieName.USER_ID,
        value: params.userId,
      },
      {
        name: CookieName.AVATAR,
        value: params.avatar!,
      },
      {
        name: CookieName.SINGLE_WORKSPACE,
        value: params.singleWorkspace,
      },
    ]);
    store.singleAuthentication({
      avatar: params.avatar,
      account: params.account,
      workspace: params.singleWorkspace,
    });
  };

  const authenticateWorkspace = () => {};

  return {
    account: store.account,
    workspaces: store.workspaces,
    permissions: store.permissions,
    isInvalidAccount: store.invalidAccount,
    handlers: {
      authenticate,
      authenticateWorkspace,
      setInvalidAccount: store.setInvalidAccount,
    },
  };
};

export { useAuth };
