import { useEffect } from 'react';
import { AuthTokens, initiateSignIn } from '@/helpers/authApi';
import jwt from 'jwt-decode';
import { getLocalStorageTokens, setLocalStorageTokens } from '@/helpers/auth';

const REFRESH_TOKEN_INTERVAL = 60 * 1000;

export const useRefreshTokens = () => {
  let fetchNewTokensTimeout: NodeJS.Timeout | null = null;

  const refreshTokens = async (refreshToken: string) => {
    const newTokens = await initiateSignIn(refreshToken);
    setLocalStorageTokens(newTokens);

    fetchNewTokensTimeout = setTimeout(() => {
      refreshTokens(refreshToken);
    }, REFRESH_TOKEN_INTERVAL);

    return newTokens;
  };

  useEffect(() => {
    const refreshToken = getLocalStorageTokens().refreshToken;
    if (!refreshToken) return;
    refreshTokens(refreshToken);

    return () => {
      if (fetchNewTokensTimeout) clearTimeout(fetchNewTokensTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
