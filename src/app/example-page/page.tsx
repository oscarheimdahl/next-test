import Card from './components/Card/Card';
import Fetcher from './components/Fetcher/Fetcher';
import { useRouter } from 'next/router';

const page = () => {
  return (
    <div className="p-2">
      <h1 className="text-2xl">Welcome to the example page</h1>
      <Card></Card>
      <Fetcher></Fetcher>
    </div>
  );
};

export default page;
