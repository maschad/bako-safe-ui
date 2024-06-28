import { Badge, CircularProgress, Icon } from '@chakra-ui/react';

import { PendingIcon } from '@/components';

interface WaitingSignatureBadgeProps {
  isLoading?: boolean;
  quantity: number;
}

const WaitingSignatureBadge = (props: WaitingSignatureBadgeProps) => {
  const { isLoading, quantity } = props;

  const has = quantity > 0;

  if (isLoading) {
    return (
      <CircularProgress
        size="20px"
        trackColor="dark.100"
        color="brand.500"
        isIndeterminate
      />
    );
  }

  if (!has) {
    return null;
  }

  return (
    <Badge h={5} variant="yellow" fontSize="xs">
      <Icon as={PendingIcon} fontSize={12} />
      {`${quantity} waiting for your signature`}
    </Badge>
  );
};

export { WaitingSignatureBadge };
