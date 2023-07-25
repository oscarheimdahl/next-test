'use client';

import { useEffect } from 'react';
import { generateActiveNonce, setLocalStorageTokens } from '../helpers/auth';
import { useRouter } from 'next/navigation';
import { fetchTokens } from '../helpers/authApi';

const ENLIGHT_CLIENT_ID = '300986fd-1ab2-4955-8c53-6a8e1994fdf6';

const Auth = () => {
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      const params = new URLSearchParams(window.location.search);
      // const callbackURL = params.get('callback_url') || '/';
      const code = params.get('code');
      const state = params.get('state');

      if (code) {
        const tokens = await fetchTokens(code);
        setLocalStorageTokens(tokens);
        router.replace('/');
        return;
      }

      const digitalServicesURL = 'https://sandbox.digital-services.skf.com';
      const nonce = generateActiveNonce();
      const authURL = new URL('/auth', digitalServicesURL);
      authURL.searchParams.set('client_id', ENLIGHT_CLIENT_ID);
      authURL.searchParams.set('state', nonce);
      authURL.searchParams.set('redirect_uri', window.location.href);

      window.location.replace(authURL.toString());
    };
    authenticate();
  }, []);
  return <div>page</div>;
};

export default Auth;
