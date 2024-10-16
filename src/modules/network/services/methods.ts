import { Provider } from 'fuels';

import { api } from '@/config';
import { localStorageKeys } from '@/modules/auth/services';

export enum NetworkQueryKey {
  CREATE_NETWORK = 'create-network',
  LIST_NETWORKS = 'list-networks',
  SELECT_NETWORK = 'select-network',
  DELETE_NETWORK = 'delete-network',
  CHECK_NETWORK = 'check-network',
}

export enum NetworkType {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
  DEV = 'dev',
}

export type CustomNetwork = {
  name: string;
  url: string;
  chainId: number;
};

export type CreateNetworkPayload = CustomNetwork;

export type DeleteNetworkPayload = {
  url: string;
};

export type SelectNetworkPayload = {
  url?: string;
};

export type CheckNetworkPayload = {
  url: string;
};

export type CreateNetworkResponse = void;
export type DeleteNetworkResponse = void;
export type SelectNetworkResponse = boolean;
export type CheckNetworkResponse = string | undefined;

export const availableNetWorks = {
  [NetworkType.MAINNET]: {
    name: 'Ignition',
    url: import.meta.env.VITE_MAINNET_NETWORK,
    chainId: 9889,
    explorer: 'https://app-mainnet.fuel.network/',
  },
  [NetworkType.TESTNET]: {
    name: 'Fuel Sepolia Testnet',
    url: 'https://testnet.fuel.network/v1/graphql',
    chainId: 0,
    explorer: 'https://app.fuel.network/',
  },
  ...(window.location.hostname.includes('localhost') && {
    [NetworkType.DEV]: {
      name: 'Local',
      url: 'http://localhost:4000/v1/graphql',
      chainId: 0,
      explorer: 'http://localhost:4000/explorer',
    },
  }),
};

export class NetworkService {
  static async create(newNetwork: CustomNetwork) {
    const networks: CustomNetwork[] = JSON.parse(
      localStorage.getItem(localStorageKeys.NETWORKS) ?? '[]',
    );

    if (networks.find((net) => net.url === newNetwork.url)) return;

    localStorage.setItem(
      localStorageKeys.NETWORKS,
      JSON.stringify([...networks, newNetwork]),
    );
  }

  static list() {
    const networks: CustomNetwork[] = JSON.parse(
      localStorage.getItem(localStorageKeys.NETWORKS) ?? '[]',
    );

    if (!networks.length) {
      localStorage.setItem(
        localStorageKeys.NETWORKS,
        JSON.stringify(Object.values(availableNetWorks)),
      );

      return Object.values(availableNetWorks);
    }

    return networks;
  }

  static async delete({ url }: DeleteNetworkPayload) {
    const existingNetworks: CustomNetwork[] = JSON.parse(
      localStorage.getItem(localStorageKeys.NETWORKS) ?? '[]',
    );

    const filtered = existingNetworks?.filter((net) => net.url !== url);

    localStorage.setItem(localStorageKeys.NETWORKS, JSON.stringify(filtered));
  }

  static async selectNetwork({ url }: SelectNetworkPayload) {
    const { data } = await api.post<SelectNetworkResponse>(
      `/user/select-network/`,
      { network: url },
    );

    return data;
  }

  static async check({ url }: CheckNetworkPayload) {
    const provider = await Provider.create(url);

    const chain = provider.getChain();

    return chain?.name;
  }

  static async hasNetwork(url: string) {
    const networks = NetworkService.list();

    return networks.some((net) => net.url === url);
  }

  static findByUrl(url: string) {
    const networks = NetworkService.list();
    return networks.find((net) => net.url === url);
  }

  static getName(url: string) {
    const network = NetworkService.findByUrl(url);
    return network?.name ?? 'Unknown';
  }

  static getExplorer(url: string) {
    const network = NetworkService.findByUrl(url);

    if (network && 'explorer' in network && network.explorer) {
      return network.explorer;
    }

    const defaultNetwork = availableNetWorks[NetworkType.MAINNET];
    return defaultNetwork.explorer;
  }
}
