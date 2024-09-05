import { useQueryParams } from '@/modules';
import { useTransactionsContext } from '@/modules/transactions/providers/TransactionsProvider';
import { currentPath } from '@/utils';

import { useIsFilteringInProgress } from './useIsFilteringInProgress';

export type IUseIsWorkspaceReady = {
  isGifAnimationLoading: boolean;
  isUserInfosLoading: boolean;
  isVaultRequestLoading: boolean;
  isVaultAssetsLoading: boolean;
  isAddressbookInfosLoading: boolean;
  isLatestsPredicatesLoading: boolean;
  isWorkspaceBalanceLoading: boolean;
};

export const useIsWorkspaceReady = ({
  isAddressbookInfosLoading,
  isGifAnimationLoading,
  isLatestsPredicatesLoading,
  isUserInfosLoading,
  isVaultAssetsLoading,
  isVaultRequestLoading,
}: IUseIsWorkspaceReady) => {
  const { isSignInpage, isFromDapp } = currentPath();
  const { expiredSession } = useQueryParams();

  const {
    homeTransactions: {
      request: { isLoading: isHomeRequestLoading },
    },
    transactionsPageList: {
      request: {
        isLoading: isTransactionsPageListLoading,
        isFetching: isTransactionsPageListFetching,
      },
    },
    vaultTransactions: {
      request: {
        isLoading: isVaultTransactionsLoading,
        isFetching: isVaultTransactionsFetching,
      },
    },
  } = useTransactionsContext();

  const isFilteringInProgress = useIsFilteringInProgress({
    isGifAnimationLoading,
    isTransactionsPageListFetching,
    isVaultTransactionsFetching,
  });

  const onLogout = isSignInpage && !expiredSession;
  const onFilter = isFilteringInProgress && !isFromDapp;

  if (onLogout || onFilter) {
    return { isWorkspaceReady: true, isFilteringInProgress };
  }

  const loadingConditions = [
    isAddressbookInfosLoading,
    isGifAnimationLoading,
    isLatestsPredicatesLoading,
    isUserInfosLoading,
    isVaultAssetsLoading,
    isVaultRequestLoading,
    isHomeRequestLoading,
    isTransactionsPageListLoading,
    isVaultTransactionsLoading,
  ];

  const isWorkspaceReady = !loadingConditions.some((condition) => condition);

  return { isWorkspaceReady, isFilteringInProgress };
};
