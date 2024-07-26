import { useState } from 'react';

export default function Greeting({messages}) {

  const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];

  const [greeting, setGreeting] = useState(messages[0]);

  return (
    <>
      <h3>{greeting}! Thank you for visiting!</h3>
      <button className="font-serif appearance-none py-2 px-4 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75" onClick={() => setGreeting(randomMessage())}>
        New Greeting
      </button>
    </>
  );
}