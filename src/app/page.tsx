'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <nav className='flex flex-col gap-2 m-2'>
      <Link href={'create-new'}>
        <button>Create New</button>
      </Link>
      <Link href={'create-new'}>
        <button>Create New Template</button>
            </Link>
      <Link href={'create-new'}>
        <button>Import</button>
      </Link>
    </nav>
  );
}
