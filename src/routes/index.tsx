import { BrowserRouter, Routes } from 'react-router-dom';

import {
  exampleRoutes,
  faucetRoutes,
  homeRoutes,
  signinRoutes,
  templateRoutes,
  transactionRoutes,
  vaultRoutes,
} from '@/modules';

const routes = (
  <>
    {exampleRoutes}
    {signinRoutes}
    {homeRoutes}
    {faucetRoutes}
    {vaultRoutes}
    {templateRoutes}
    {transactionRoutes}
  </>
);

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>{routes}</Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
