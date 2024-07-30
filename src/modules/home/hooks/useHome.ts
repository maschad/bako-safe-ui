import { useNavigate, useParams } from 'react-router-dom';

import { queryClient } from '@/config';
import { AddressBookQueryKey, Pages, WorkspacesQueryKey } from '@/modules/core';
import { useTransactionsSignaturePending } from '@/modules/transactions/hooks/list';
import { useSelectWorkspace } from '@/modules/workspace';

import { useHomeDataRequest } from './useHomeDataRequest';
import { useWorkspaceContext } from '@/modules/workspace/WorkspaceProvider';

const useHome = () => {
  const auth = useWorkspaceContext();

  const navigate = useNavigate();
  const { account } = useWorkspaceContext();
  const { vaultId } = useParams();
  const vaultsPerPage = 8;
  const homeDataRequest = useHomeDataRequest();

  const pendingSignerTransactions = useTransactionsSignaturePending();

  const vaultsTotal = homeDataRequest?.data?.predicates.total ?? 0;

  const { selectWorkspace } = useSelectWorkspace();

  const goHome = () => {
    selectWorkspace(auth.workspaces.single, {
      onSelect: async () => {
        auth.handlers.authenticateWorkspaceSingle();
        await queryClient.invalidateQueries({
          queryKey: WorkspacesQueryKey.FULL_DATA(
            auth.workspaces.single,
            vaultId!,
          ),
        });
        await queryClient.invalidateQueries({
          queryKey: AddressBookQueryKey.LIST_BY_USER(auth.workspaces.single),
        });
        navigate(Pages.home());
      },
    });
  };

  return {
    account,
    vaultsRequest: {
      ...homeDataRequest,
      vaults: {
        recentVaults: homeDataRequest.data?.predicates?.data,
        vaultsMax: vaultsPerPage,
        extraCount:
          vaultsTotal <= vaultsPerPage ? 0 : vaultsTotal - vaultsPerPage,
      },
      loadingRecentVaults: homeDataRequest.isLoading,
      refetchVaults: homeDataRequest.refetch,
    },
    transactionsRequest: {
      ...homeDataRequest,
      loadingTransactions: homeDataRequest.isLoading,
    },
    homeRequest: homeDataRequest,
    navigate,
    goHome,
    pendingSignerTransactions,
  };
};

export { useHome };
