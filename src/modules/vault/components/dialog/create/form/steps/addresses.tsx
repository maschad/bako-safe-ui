import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Select,
  TabPanel,
  VStack,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import { Dialog, RemoveIcon, UserAddIcon } from '@/components';
import { AutoComplete } from '@/components/autocomplete';
import { ITemplate, UseCreateVaultReturn } from '@/modules';
import { CreateContactDialog } from '@/modules/addressBook/components';
import { useContact } from '@/modules/addressBook/hooks/';
import { AddressBook } from '@/modules/core/models/addressBook';

export interface VaultAddressesStepProps {
  form: UseCreateVaultReturn['form'];
  addresses: UseCreateVaultReturn['addresses'];
  templates: ITemplate[];
  setTemplate: UseCreateVaultReturn['setFormWithTemplate'];
}

const VaultAddressesStep = ({
  form,
  addresses,
  templates,
  setTemplate,
}: VaultAddressesStepProps) => {
  const {
    contactDialogIsOpen,
    handleCloseDialog,
    // handleOpenDialog,
    findContactsRequest,
    search,
  } = useContact();

  return (
    <>
      <CreateContactDialog
        isOpen={contactDialogIsOpen}
        onClose={handleCloseDialog}
      />

      <TabPanel p={0}>
        <Dialog.Section
          hidden={!templates.length}
          title={
            <Heading fontSize="lg" color="grey.200">
              Vault rules
            </Heading>
          }
          description="What is the rule of the vault?"
          mb={8}
        />

        <Divider
          hidden={!templates.length}
          borderColor="dark.100"
          mt={5}
          mb={9}
        />

        <Box hidden={!templates.length} w="100%">
          <FormControl>
            <Select
              placeholder=" "
              onChange={(item) => setTemplate(item.target.value)}
            >
              {templates.length > 0 &&
                templates?.map((item: ITemplate) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </Select>
            <FormLabel>Do you want to use a template?</FormLabel>
            <FormHelperText>
              You can make your work easier by following a rule that {`you've`}{' '}
              set up.
            </FormHelperText>
          </FormControl>
        </Box>

        <Divider hidden={!templates.length} borderColor="dark.100" my={9} />

        <Dialog.Section
          title={
            <Heading fontSize="md" color="grey.200">
              Vault signers
            </Heading>
          }
          description="Who is going to sign this vault?"
          mb={8}
        />

        <VStack spacing={6}>
          {addresses.fields.map(({ id }, index) => (
            <Controller
              key={id}
              name={`addresses.${index}.value`}
              render={({ field, fieldState }) => (
                <AutoComplete<AddressBook>
                  value={index === 0 ? field.value : undefined}
                  label={index === 0 ? 'Your address' : `Address ${index + 1}`}
                  isInvalid={fieldState.invalid}
                  isDisabled={index === 0}
                  onChange={field.onChange}
                  onInputChange={search.handler}
                  errorMessage={fieldState.error?.message}
                  isLoading={findContactsRequest.isLoading}
                  options={findContactsRequest?.data ?? []}
                  actionIcon={RemoveIcon}
                  action={index > 0 ? () => addresses.remove(index) : undefined}
                  fieldsToShow={(option: AddressBook) =>
                    `${option.nickname} - ${option.user.address}`
                  }
                />
              )}
              control={form.control}
            />
          ))}

          <Button
            border="none"
            bgColor="dark.100"
            variant="secondary"
            onClick={addresses.append}
            leftIcon={<UserAddIcon />}
          >
            Add address
          </Button>
        </VStack>

        <Divider borderColor="dark.100" my={9} />

        <HStack>
          <Dialog.Section
            w="full"
            maxW={300}
            title={
              <Heading fontSize="md" color="grey.200">
                Min signatures required?
              </Heading>
            }
            description="Set the minimum number of signatures to approve a transfer."
          />

          <Box w="full" maxW={90}>
            <Controller
              name="minSigners"
              control={form.control}
              render={({ field }) => (
                <FormControl>
                  <Select
                    pt={2}
                    pb={2}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder=" "
                  >
                    {Array(10)
                      .fill('')
                      .map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                  </Select>
                </FormControl>
              )}
            />
          </Box>
        </HStack>
      </TabPanel>
    </>
  );
};

export { VaultAddressesStep };
