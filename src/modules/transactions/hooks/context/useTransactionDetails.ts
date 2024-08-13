import { useTransactionList, useTransactionsSignaturePending } from '../list';
import { useAuth } from '@/modules/auth';
import { useSignTransaction } from '../signature';
import { useHomeTransactions } from '@/modules/home/hooks/useHomeTransactions';
import { useGetParams } from '@/modules/core';

export type IuseTransactionDetails = ReturnType<typeof useTransactionDetails>;

const useTransactionDetails = () => {
  const {
    userInfos: { workspace },
  } = useAuth();
  const {
    vaultPageParams: { vaultId },
  } = useGetParams();

  const homeTransactions = useHomeTransactions(workspace?.id);
  const pendingSignerTransactions = useTransactionsSignaturePending([vaultId!]);
  const transactionsPageList = useTransactionList({
    workspaceId: workspace?.id,
    byMonth: true,
  });

  const signTransaction = useSignTransaction({
    transactionList: transactionsPageList,
    pendingSignerTransactionsRefetch: pendingSignerTransactions.refetch,
    homeTransactionsRefetch: homeTransactions.request.refetch,
  });

  const invalidateAllTransactionsTypeFilters = () => {
    homeTransactions.handlers.homeTransactionTypeFilter(undefined);
    transactionsPageList.handlers.listTransactionTypeFilter(undefined);
  };

  return {
    homeTransactions,
    transactionsPageList,
    signTransaction,
    pendingSignerTransactions,
    invalidateAllTransactionsTypeFilters,
  };
};

export { useTransactionDetails };
