import { SignInWrapper } from '@/modules/auth/components';

import { useWebSignIn } from '../hooks/signIn/useWebSignIn';

const WebSignInPage = () => {
  const {
    isAnyWalletConnectorOpen,
    tabs,
    formData,
    formState,
    accountsOptions,
    createdAcccountUsername,
    inputBadge,
    handleSelectWallet,
    handleInputChange,
  } = useWebSignIn();

  return (
    <SignInWrapper
      tabs={tabs}
      formData={formData}
      formState={formState}
      accountsOptions={accountsOptions}
      inputBadge={inputBadge}
      createdAcccountUsername={createdAcccountUsername}
      isAnyWalletConnectorOpen={isAnyWalletConnectorOpen}
      handleInputChange={handleInputChange}
      handleSelectWallet={handleSelectWallet}
    />
  );
};

export { WebSignInPage };
