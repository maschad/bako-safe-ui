import { useConnectors } from '@fuels/react';

import { FueletIcon, FuelIcon } from '@/components';

export enum EConnectors {
  FUEL = 'Fuel Wallet',
  FULLET = 'Fuelet Wallet',
  WEB_AUTHN = 'WebAuthn',
}

const DEFAULT_CONNECTORS = [
  {
    name: EConnectors.WEB_AUTHN,
    icon: FuelIcon,
  },
  {
    name: EConnectors.FUEL,
    icon: FuelIcon,
  },
  {
    name: EConnectors.FULLET,
    icon: FueletIcon,
  },
];

const useDefaultConnectors = () => {
  const { connectors, ...query } = useConnectors();

  const defaultConnectors = DEFAULT_CONNECTORS.map((connector) => {
    const fuelConnector = connectors?.find((c) => c.name === connector.name);
    const hasWebAuthn = !!window.navigator.credentials;
    const isWebAuthn = connector.name === EConnectors.WEB_AUTHN;
    return {
      ...connector,
      imageUrl: undefined,
      isEnabled:
        (!!fuelConnector && fuelConnector.installed) ||
        (isWebAuthn && hasWebAuthn),
    };
  });

  return {
    connectors: defaultConnectors,
    ...query,
  };
};

export { DEFAULT_CONNECTORS, useDefaultConnectors };
