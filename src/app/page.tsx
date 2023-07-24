import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-2">
      <h1 className="text-3xl">This is the start page</h1>
      <nav className="flex flex-col gap-2 m-2">
        <Link href={'create-new'}>
          <button className="bg-red-500 p-2 rounded-md">Create New</button>
        </Link>
      </nav>
    </div>
  );
}
