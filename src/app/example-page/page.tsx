import Card from './components/Card/Card';
import Fetcher from './components/Fetcher/Fetcher';
import { useRouter } from 'next/router';
import StateUpdater from './components/StateUpdater/StateUpdater';
import StateShower from './components/StateShower/StateShower';

const page = () => {
  return (
    <div className="m-4 flex flex-col gap-4">
      <h1 className="text-2xl">Welcome to the example page</h1>
      <Card />
      <Fetcher />
      <StateUpdater />
      <StateShower />
    </div>
  );
};

export default page;
