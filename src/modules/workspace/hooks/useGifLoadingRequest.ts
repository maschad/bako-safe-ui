import { useQuery } from '@tanstack/react-query';

import { authCredentials } from '@/modules';
import { IUserInfos } from '@/modules/auth/services';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';

export enum GifLoadingRequestQueryKey {
  ANIMATION_LOADING = 'animation-loading',
}

const useGitLoadingRequest = (logout?: () => void, userInfos?: IUserInfos) => {
  const { isTokenExpired, setIsTokenExpired } = useAuthStore();
  const { address, token } = authCredentials();

  const { isLoading, isFetching, refetch } = useQuery({
    queryKey: [GifLoadingRequestQueryKey.ANIMATION_LOADING],
    queryFn: () =>
      new Promise((resolve) => {
        if (
          !token &&
          !address &&
          !userInfos?.address &&
          !isLoading &&
          !isFetching
        ) {
          setIsTokenExpired(true);
        }
        setTimeout(() => {
          if (isTokenExpired) {
            setIsTokenExpired(false);
            logout?.();
          }
          resolve(true);
        }, 2880);
      }),
  });

  return {
    isLoading: isLoading || isFetching,
    refetch,
  };
};

export { useGitLoadingRequest };
