import React from 'react';
import StateShower from '../example-page/components/StateShower/StateShower';
import StateUpdater from '../example-page/components/StateUpdater/StateUpdater';

const page = () => {
  return (
    <>
      <StateUpdater />
      <StateShower />
    </>
  );
};

export default page;
