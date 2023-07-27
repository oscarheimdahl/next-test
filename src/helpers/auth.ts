import jwt from 'jwt-decode';
import { AuthTokens, initiateSignIn } from './authApi';

export const NEED_TO_SIGN_IN_ERROR = 'need_to_sign_in';

//TODO add return type
export const decodeToken = (token: string): any => {
  return jwt(token);
};

export const getTokens = async () => {
  const tokens = getLocalStorageTokens();
  if (!tokens?.refreshToken) {
    throw new Error(NEED_TO_SIGN_IN_ERROR);
  }
  const { accessToken, identityToken, refreshToken } = tokens;
  // const newTokens = await fetchNewTokens(refreshToken,true);
  if (accessToken && identityToken && refreshToken) return tokens as AuthTokens;
  const newTokens = await initiateSignIn(refreshToken);
  setLocalStorageTokens(newTokens);
  return newTokens;
};

export const setLocalStorageTokens = (tokens: AuthTokens) => {
  if (tokens.accessToken)
    localStorage.setItem('AccessToken', tokens.accessToken);
  if (tokens.identityToken)
    localStorage.setItem('IdentityToken', tokens.identityToken);
  if (tokens.refreshToken)
    localStorage.setItem('RefreshToken', tokens.refreshToken);
};
export const getLocalStorageTokens = (): Partial<AuthTokens> => {
  type StrUnd = string | undefined;
  const accessToken = localStorage.getItem('AccessToken') as StrUnd;
  const identityToken = localStorage.getItem('IdentityToken') as StrUnd;
  const refreshToken = localStorage.getItem('RefreshToken') as StrUnd;

  if (!accessToken || !identityToken || !refreshToken) {
    return { refreshToken }; // If some token is missing we need to refresh, missing refreshtoken is handled higher up.
  }

  const accessPayload = decodeToken(accessToken);
  const accessTokenSoonExp =
    accessPayload && accessPayload.exp * 1000 - Date.now() <= 60 * 1000;
  if (accessTokenSoonExp) {
    return { refreshToken }; // If access token is about to expire we need to refresh.
  }

  return { accessToken, identityToken, refreshToken };
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
