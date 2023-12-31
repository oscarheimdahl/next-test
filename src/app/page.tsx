'use client';
import { getTokens } from '@/helpers/auth';
import { User, fetchMe } from '@/helpers/authApi';
import { Button, Icon } from '@skf-internal/ui-components-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
    <div className="p-2 flex flex-col gap-2 m-2">
      <h1 className="text-3xl">This is the start spage</h1>
      <h3 className="text-l">
        Logged in as: <span className="text-blue-600">{user?.email}</span>
      </h3>
      <nav className="flex flex-col gap-2  w-fit ">
        <Link className="flex" href={'example-page'}>
          <Button
            className="w-full"
            feType="secondary"
            feSize="sm"
            feIcon={{ feIcon: 'paper', position: 'right' }}
          >
            Example page
          </Button>
        </Link>
        <Link className="flex" href={'canvas-playground'}>
          <Button
            feType="secondary"
            feSize="sm"
            feIcon={{ feIcon: 'recAction', position: 'right' }}
          >
            Canvas playground
          </Button>
        </Link>
      </nav>
      <div className="relative">
        <Button
          className={'w-full'}
          feLoading={isLoading}
          feType="primary"
          onClick={() => mutate()}
        >
          Test fetch
        </Button>
        {isSuccess && (
          <div className="absolute top-1/2 right-0 bg-green-700 rounded-full h-6 w-6 grid place-content-center -translate-y-1/2 translate-x-[125%]">
            <Icon feIcon="check" feColor="white" />
          </div>
        )}
      </div>
    </div>
  );
}
