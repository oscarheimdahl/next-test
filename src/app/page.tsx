'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getLocalStorageTokens, refreshTokens } from './helpers/auth';
import jwt from 'jwt-decode';
import { AuthTokens } from './helpers/authApi';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const refreshUser = async () => {
      try {
        const tokensString = getLocalStorageTokens();
        if (!tokensString) throw new Error('No saved user');
        const tokens: AuthTokens = JSON.parse(tokensString);
        refreshTokens(tokens.refreshToken);

        const decoded = jwt(tokens.identityToken);
      } catch (e) {
        router.push('/auth');
      }
      refreshUser();
    };
  }, [router]);

  return (
    <div className="p-2">
      <h1 className="text-3xl">This is the start page</h1>
      <nav className="flex flex-col gap-2 m-2 w-fit ">
        <Link className="flex" href={'example-page'}>
          <button className="bg-yellow-500 p-2 rounded-md w-full">
            Example page
          </button>
        </Link>
        <Link className="flex" href={'auth'}>
          <button className="w-full bg-red-500 p-2 rounded-md">Auth</button>
        </Link>
      </nav>
    </div>
  );
}
