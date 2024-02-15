export enum PermissionRoles {
  OWNER = 'OWNER', // owner of the workspace, THIS ROLE CAN'T BE CHANGED
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  SIGNER = 'SIGNER',
  VIEWER = 'VIEWER',
}

export interface IPermissions {
  [key: string]: {
    [key in PermissionRoles]: string[];
  };
}

export type IPermission = {
  [key in PermissionRoles]: string[];
};

export interface Member {
  id: string;
  name: string | null;
  avatar: string;
  address: string;
}

export interface WorkspaceContact {
  nickname: string;
  user: { id: string };
}

export interface Owner extends Member {}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  avatar: string;
  permissions: IPermissions;
  single: boolean;
  owner: Owner;
  members: Member[];
  predicates: number;
}

export interface WorkspaceOnVault {
  workspace: {
    id: string;
    addressBook: WorkspaceContact[];
  };
}

export const defaultPermissions = {
  [PermissionRoles.OWNER]: {
    OWNER: ['*'],
    ADMIN: [''],
    MANAGER: [''],
    SIGNER: [''],
    VIEWER: [''],
  },
  [PermissionRoles.SIGNER]: {
    OWNER: [''],
    ADMIN: [''],
    MANAGER: [''],
    SIGNER: ['*'],
    VIEWER: [''],
  },
  [PermissionRoles.ADMIN]: {
    OWNER: [''],
    ADMIN: ['*'],
    MANAGER: [''],
    SIGNER: [''],
    VIEWER: [''],
  },
  [PermissionRoles.MANAGER]: {
    OWNER: [''],
    ADMIN: [''],
    MANAGER: ['*'],
    SIGNER: [''],
    VIEWER: [''],
  },
  [PermissionRoles.VIEWER]: {
    OWNER: [''],
    ADMIN: [''],
    MANAGER: [''],
    SIGNER: [''],
    VIEWER: ['*'],
  },
};

export const WorkspacesQueryKey = {
  DEFAULT: 'workspace',
  LIST_BY_USER: () => [WorkspacesQueryKey.DEFAULT, 'list-by-user'],
  HOME: () => [WorkspacesQueryKey.DEFAULT, 'home'],
  SELECT: () => [WorkspacesQueryKey.DEFAULT, 'select'],
  GET: (workspaceId: string) => [
    WorkspacesQueryKey.DEFAULT,
    'by-id',
    workspaceId,
  ],
  ADD_MEMBER: (workspaceId: string) => [
    WorkspacesQueryKey.DEFAULT,
    'add-member',
    workspaceId,
  ],
  UPDATE_PERMISSION: (workspaceId: string) => [
    WorkspacesQueryKey.DEFAULT,
    'update-permission',
    workspaceId,
  ],
  DELETE_MEMBER: (workspaceId: string) => [
    WorkspacesQueryKey.DEFAULT,
    'delete-member',
    workspaceId,
  ],
  PENDING_TRANSACTIONS: () => 'pending-transactions',
  GET_BALANCE: () => 'balance',
  FULL_DATA: () => [
    WorkspacesQueryKey.DEFAULT,
    WorkspacesQueryKey.GET_BALANCE(),
    WorkspacesQueryKey.PENDING_TRANSACTIONS(),
  ],
};
