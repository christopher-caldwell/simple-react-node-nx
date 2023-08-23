import { useEffect, useState } from 'react';

export function App() {
  const [messageFromServer, setMessageFromServer] = useState('');

  useEffect(() => {
    const getDataFromServer = async () => {
      try {
        const res = await fetch('http://localhost:3000');
        console.log('res', res);

        const { message } = await res.json();
        setMessageFromServer(message);
      } catch (e) {
        console.error(e);
        setMessageFromServer('Error. Check the console');
      }
    };
    getDataFromServer();
  });

  return (
    <div>
      <h1>Message from Server:</h1>
      <div>{messageFromServer}</div>
    </div>
  );
}

export default App;
