'use client'; // since i use client side logic, such as useState i must be a client component, default is server component

import { useState } from 'react';

const Card = () => {
  const [buttonColor, setButtonColor] = useState<'green' | 'red'>('green');

  const handleClick = () => {
    if (buttonColor === 'green') setButtonColor('red');
    else setButtonColor('green');
  };
  return (
    <div className="p-2 m-2 bg-slate-200 rounded-md flex flex-col text-black w-fit max-w-sm">
      <h2 className="text-xl font-bold ">This is a card component</h2>
      <ul>
        <li>
          • I am unique to this view and is therefore in this page&apos;s{' '}
          <code>components</code> folder.
        </li>
        <li>
          • I have some interactivity and should therefore be tested, the test
          file should be located in the same folder as me
        </li>
      </ul>
      <button
        onClick={handleClick}
        className={`p-2  w-32 rounded-md mx-auto text-white ${
          buttonColor === 'red' ? 'bg-red-600' : 'bg-green-600'
        }`}
      >
        {buttonColor === 'red' ? 'Red' : 'Green'}
      </button>
    </div>
  );
};

export default Card;
