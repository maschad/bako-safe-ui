import { QueryState, useQuery } from '@tanstack/react-query';
import { bn } from 'fuels';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { AssetMap, NativeAssetId, useGetParams } from '@/modules/core';

const IS_VISIBLE_KEY = '@bakosafe/balance-is-visible';

const isVisibleBalance = () => localStorage.getItem(IS_VISIBLE_KEY) === 'true';
const setIsVisibleBalance = (isVisible: 'true' | 'false') =>
  localStorage.setItem(IS_VISIBLE_KEY, isVisible);

import { queryClient } from '@/config';
import { gasConfig } from '@/modules/core/hooks/bakosafe/utils/gas-config';

import { HasReservedCoins, VaultService } from '../../services';
import { useVaultTransactionsList } from '../list/useVaultTransactionsList';
import { vaultInfinityQueryKey } from '../list/useVaultTransactionsRequest';

export const vaultAssetsQueryKey = {
  VAULT_ASSETS_QUERY_KEY: (workspaceId: string, predicateId: string) => [
    'predicateId/assets',
    workspaceId,
    predicateId,
  ],
};

const useVaultAssets = (
  workspaceId: string,
  predicateId: string,
  assetsMap: AssetMap,
) => {
  const [isManualRefetching, setIsManualRefetching] = useState(false);

  const {
    request: { refetch: refetchTransactions },
  } = useVaultTransactionsList();

  const {
    vaultPageParams: { vaultId },
  } = useGetParams();

  const initialVisibility = isVisibleBalance();
  const [visibleBalance, setVisibleBalance] = useState(initialVisibility);
  const cachedData: QueryState<HasReservedCoins | undefined> | undefined =
    queryClient.getQueryState(
      vaultAssetsQueryKey.VAULT_ASSETS_QUERY_KEY(workspaceId, predicateId),
    );

  const vaultTxListRequestQueryKey =
    vaultInfinityQueryKey.VAULT_TRANSACTION_LIST_PAGINATION_QUERY_KEY(
      vaultId ?? '',
    );

  const {
    data,
    isFetching,
    refetch: refetchAssets,
    ...rest
  } = useQuery({
    queryKey: vaultAssetsQueryKey.VAULT_ASSETS_QUERY_KEY(
      workspaceId,
      predicateId,
    ),
    queryFn: async () => {
      const response = await VaultService.hasReservedCoins(predicateId);
      if (response?.currentBalanceUSD !== cachedData?.data?.currentBalanceUSD) {
        queryClient.invalidateQueries({
          queryKey: vaultTxListRequestQueryKey,
        });
      }
      return response;
    },
    refetchInterval: 10000,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
    enabled: !!predicateId,
  });

  const getCoinAmount = useCallback(
    (assetId: string) => {
      const balance = data?.currentBalance.find(
        (asset) => asset.assetId === assetId,
      );

      if (!balance) {
        return bn(0);
      }

      return bn(balance.amount);
    },
    [data?.currentBalance],
  );

  const getAssetInfo = (assetId: string) =>
    assetsMap[assetId] ?? assetsMap['UNKNOWN'];

  const hasAssetBalance = useCallback(
    (assetId: string, value: string) => {
      const units = getAssetInfo(assetId)?.units;
      const coinBalance = getCoinAmount(assetId).format({ units });
      const hasBalance = bn(bn.parseUnits(value)).lte(
        bn.parseUnits(coinBalance),
      );

      return hasBalance;
    },
    [getCoinAmount],
  );

  const hasBalance = useMemo(() => {
    const result = data?.currentBalance.some((asset) =>
      bn(bn.parseUnits(asset.amount)).gt(0),
    );

    return result;
  }, [data?.currentBalance]);

  const ethBalance = useMemo(() => {
    return getCoinAmount(NativeAssetId).format();
  }, [getCoinAmount]);

  const isEthBalanceLowerThanReservedAmount = useMemo(() => {
    // Needs to be fixed using the correct baseFee format or method
    return (
      Number(ethBalance) <= Number(bn.parseUnits(gasConfig.toString()).format())
    );
  }, [ethBalance]);

  const handleSetVisibleBalance = (visible: any) => {
    setVisibleBalance(visible);
    setIsVisibleBalance(visible ? 'true' : 'false');
  };

  const handleManualRefetch = () => {
    if (isManualRefetching) return;

    setIsManualRefetching(true);
    refetchAssets();
    refetchTransactions();
  };

  useEffect(() => {
    if (!isFetching) setIsManualRefetching(false);
  }, [isFetching]);

  return {
    assets: data?.currentBalance,
    ...rest,
    getAssetInfo,
    getCoinAmount,
    hasAssetBalance,
    setVisibleBalance: handleSetVisibleBalance,
    isManualRefetching,
    handleManualRefetch,
    hasBalance,
    ethBalance,
    isEthBalanceLowerThanReservedAmount,
    hasAssets: !!data?.currentBalance?.length,
    visibleBalance,
    balanceUSD: data?.currentBalanceUSD,
  };
};

export { useVaultAssets };
