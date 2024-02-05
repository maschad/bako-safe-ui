import { Box, Heading, Link, Text } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import { Dialog } from '@/components';
import { AutoComplete } from '@/components/autocomplete';
import { AddressBookUtils } from '@/utils';

import { UseChangeMember } from '../../hooks';

interface MemberAddressForm {
  form: UseChangeMember['form']['memberForm'];
  addressBook: UseChangeMember['addressBook'];
}

/* TODO: Move to components folder */
export const MemberAddressForm = ({ form, addressBook }: MemberAddressForm) => {
  const { contacts } = addressBook.contactsPaginatedRequest;
  const address = form.watch('address');

  const options =
    contacts &&
    AddressBookUtils.removeDuplicates(contacts)
      ?.filter(
        ({ user, nickname }) =>
          !!address &&
          (user.address.includes(address) ||
            nickname.toLowerCase().includes(address.toLowerCase())),
      )
      ?.map(({ user, nickname }) => ({
        value: user.address,
        label: AddressBookUtils.formatForAutocomplete(nickname, user.address),
      }));

  const bottomAction = (
    <Box mt={2}>
      <Text color="grey.200" fontSize={12}>
        Do you wanna{' '}
        <Link
          color="brand.500"
          onClick={() =>
            addressBook.handleOpenDialog?.({
              address: form.getValues('address'),
            })
          }
        >
          add
        </Link>{' '}
        this address in your address book?
      </Text>
    </Box>
  );

  return (
    <Box w="full">
      <Dialog.Section
        title={
          <Heading fontSize="md" color="grey.200">
            Member address
          </Heading>
        }
        description="Who it will be a new member in your workspace?"
        mb={8}
      />
      <Controller
        name="address"
        control={form.control}
        render={({ field, fieldState }) => (
          <AutoComplete
            index={0}
            label="Name or address"
            value={field.value}
            onInputChange={addressBook.search.handler}
            onChange={field.onChange}
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            options={options}
            isLoading={!addressBook.contactsPaginatedRequest.isSuccess}
            bottomAction={bottomAction}
            inView={addressBook.inView}
          />
        )}
      />
    </Box>
  );
};
