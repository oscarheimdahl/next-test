const SSO_URL = 'https://sso-api.sandbox.users.enlight.skf.com';

export type AuthTokens = {
  accessToken: string;
  identityToken: string;
  refreshToken: string;
};

type InitiateSignInResponse = {
  data: {
    tokens: AuthTokens;
  };
  error: any;
};

export const initiateSignIn = async (refreshToken: string) => {
  const response = await fetch(`${SSO_URL}/sign-in/initiate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  const body: InitiateSignInResponse = await response.json();

  if (response.status !== 200 || !body.data || !body.data.tokens) {
    throw new Error(
      `Unable to sign-in, ${body.error || 'unsupported response'}`,
    );
  }

  return body.data.tokens;
};

type GetTokensResponse = {
  data: {
    tokens: AuthTokens;
  };
};

export const fetchTokens = async (code: string) => {
  const response = await fetch(`${SSO_URL}/tokens?code=${code}`, {
    headers: { 'Content-Type': 'application/json' },
  });

  const body: GetTokensResponse = await response.json();

  if (response.status !== 200 || !body.data || !body.data.tokens) {
    throw new Error(`failed to get /tokens ${response.status} ${body}`);
  }

  return body.data.tokens;
};
