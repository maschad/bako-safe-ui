import { TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';

import { useWalletSignIn, useWebAuthnSignIn } from '@/modules';
import { useContactToast } from '@/modules/addressBook';
import {
  ConnectorsList,
  SigninContainer,
  SigninContainerMobile,
  SignInFooter,
  SignInHeader,
  WebAuthnAccountCreated,
  WebAuthnSignIn,
} from '@/modules/auth/components';
import { useListConnectors } from '@/modules/core/hooks/fuel/useListConnectors';
import { useWorkspaceContext } from '@/modules/workspace/WorkspaceProvider';

const SigninPage = () => {
  const { connectors } = useListConnectors();
  const { handleSelectWallet, isAnyWalletConnectorOpen } = useWalletSignIn();
  const {
    tabs,
    formData,
    formState,
    accountsOptions,
    createdAcccountUsername,
    handleInputChange,
  } = useWebAuthnSignIn();
  const { errorToast } = useContactToast();
  const {
    authDetails: auth,
    screenSizes: { isMobile },
  } = useWorkspaceContext();

  const pageSections = {
    title: 'Welcome to Bako Safe',
  };

  useEffect(() => {
    auth.invalidAccount &&
      errorToast({
        title: 'Invalid Account',
        description: 'You need to use the fuel wallet to connect.',
      });
    auth.handlers.setInvalidAccount?.(false);
  }, [auth.invalidAccount]);

  if (isMobile) {
    return (
      <SigninContainerMobile>
        <Tabs index={tabs.tab} flex={1} w="full">
          <TabPanels h="full">
            <TabPanel h="full" p={0}>
              <VStack
                justifyContent="center"
                w="full"
                pb={6}
                px={6}
                spacing={14}
              >
                <SignInHeader title={createdAcccountUsername} />

                <VStack w="full" spacing={6}>
                  <WebAuthnSignIn
                    formData={formData}
                    formState={formState}
                    accountsOptions={accountsOptions}
                    handleInputChange={handleInputChange}
                  />

                  <ConnectorsList
                    connectors={connectors}
                    onConnectorSelect={handleSelectWallet}
                    isAnyWalletConnectorOpen={isAnyWalletConnectorOpen}
                  />
                </VStack>

                <SignInFooter />
              </VStack>
            </TabPanel>

            <TabPanel h="full">
              <WebAuthnAccountCreated
                title={createdAcccountUsername}
                formState={formState}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </SigninContainerMobile>
    );
  }

  return (
    <SigninContainer>
      <Tabs index={tabs.tab} flex={1} w="full">
        <TabPanels h="full">
          <TabPanel h="full" p={0}>
            <VStack
              h="full"
              spacing={4}
              alignItems="center"
              justifyContent="space-evenly"
            >
              <SignInHeader title={pageSections.title} />

              <VStack w="full" spacing={8}>
                <WebAuthnSignIn
                  formData={formData}
                  formState={formState}
                  accountsOptions={accountsOptions}
                  handleInputChange={handleInputChange}
                />

                <ConnectorsList
                  connectors={connectors}
                  onConnectorSelect={handleSelectWallet}
                  isAnyWalletConnectorOpen={isAnyWalletConnectorOpen}
                />
              </VStack>

              <SignInFooter />
            </VStack>
          </TabPanel>

          <TabPanel h="full">
            <WebAuthnAccountCreated
              title={createdAcccountUsername}
              formState={formState}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </SigninContainer>
  );
};

export { SigninPage };
