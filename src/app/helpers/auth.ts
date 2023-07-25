import { AuthTokens, initiateSignIn } from './authApi';

export const refreshTokens = async (refreshToken: string) => {
  // if (accessToken && identityToken && refreshToken && !options.force) {
  //   return { accessToken, identityToken, refreshToken };
  // }

  if (!refreshToken) {
    throw new Error('need_to_sign_in');
  }

  const newTokens = await initiateSignIn(refreshToken);

  setLocalStorageTokens(newTokens);

  // Auth.REFRESHER_HANDLE = window.setTimeout(
  //   Auth.refreshTokens,
  //   AUTO_REFRESH_INTERVAL_IN_MS,
  //   { force: true },
  // );

  return newTokens;
};

export const setLocalStorageTokens = (tokens: AuthTokens) => {
  localStorage.setItem('tokens', JSON.stringify(tokens));
};
export const getLocalStorageTokens = () => {
  return localStorage.getItem('tokens');
};

const MAX_NONCE_SIZE = 1;
const NONCE_STORAGE_PREFIX = 'active_nonce_';

export const generateActiveNonce = () => {
  const rawNonce = new Uint32Array(MAX_NONCE_SIZE);
  let nonce;
  do {
    window.crypto.getRandomValues(rawNonce);
    nonce = rawNonce.reduce((str, value) => str + value.toString(36), '');
  } while (isActiveNonce(nonce));

  window.sessionStorage.setItem(
    `${NONCE_STORAGE_PREFIX}${nonce}`,
    new Date().valueOf().toString(),
  );
  return nonce;
};

const isActiveNonce = (nonce: string) =>
  window.sessionStorage.getItem(`${NONCE_STORAGE_PREFIX}${nonce}`) !== null;
