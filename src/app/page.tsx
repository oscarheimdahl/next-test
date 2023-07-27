'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { decodeToken, getTokens } from '@/helpers/auth';
import { AuthTokens, User, fetchMe } from '@/helpers/authApi';
import { useMutation } from 'react-query';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetchMe();
        setUser(user);
      } catch (e) {
        router.push('/auth');
      }
    };
    fetchUser();
  }, [router]);

  const testFetch = async () => {
    const id = 'd67a1176-a0c9-4c43-ae9b-8261b9ee48ba';
    const res = await fetch(
      `https://analyze.sandbox.users.enlight.skf.com/analyze/details/${id}?v2`,
      {
        headers: {
          Authorization: (await getTokens()).identityToken,
        },
      },
    );
    const json = await res.json();
  };

  const { mutate, isLoading, isSuccess } = useMutation(
    'fetchDetails',
    testFetch,
  );

  if (!user) return <></>;
  return (
    <div className="p-2">
      <h1 className="text-3xl">This is the start spage</h1>
      <h3 className="text-l">
        Logged in as: <span className="text-blue-600">{user?.email}</span>
      </h3>
      <nav className="flex flex-col gap-2 m-2 w-fit ">
        <Link className="flex" href={'example-page'}>
          <button className="bg-yellow-500 p-2 rounded-md w-full">
            Example page
          </button>
        </Link>

        <div className="relative ">
          {isSuccess && (
            <span className="absolute -right-8 w-6 h-6 text-sm grid place-content-center bg-green-600 rounded-full p-1 top-1/2 -translate-y-1/2">
              ✔
            </span>
          )}
          <button
            onClick={() => mutate()}
            className={`w-full bg-red-500 p-2 rounded-md ${
              isLoading ? 'animate-pulse' : ''
            }`}
          >
            Test fetch
          </button>
        </div>
      </nav>
    </div>
  );
}
