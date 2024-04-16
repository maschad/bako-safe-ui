import { ChakraProvider } from '@chakra-ui/react';
import { defaultConnectors } from '@fuel-wallet/sdk';
import { FuelProvider } from '@fuels/react';
import { BSafe } from 'bsafe';
import { Provider as JotaiProvider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/App';
import { BsafeQueryClientProvider } from '@/config';
import { TransactionSendProvider } from '@/modules/transactions';
import { defaultTheme } from '@/themes';

import { SocketProvider } from './config/socket';

BSafe.setup({
  API_URL: import.meta.env.VITE_API_URL,
  BSAFE_URL: import.meta.env.VERCEL_URL || window.location.origin,
  PROVIDER: import.meta.env.VITE_NETWORK,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={defaultTheme}>
      <FuelProvider
        fuelConfig={{
          connectors: defaultConnectors(),
        }}
      >
        <SocketProvider>
          <JotaiProvider>
            <BsafeQueryClientProvider>
              <TransactionSendProvider>
                <App />
              </TransactionSendProvider>
            </BsafeQueryClientProvider>
          </JotaiProvider>
        </SocketProvider>
      </FuelProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
