import './App.css';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './services/fireBaseInit';
import { ChakraProvider } from '@chakra-ui/react';

// import components
import Contest from './components/Contest/Contest';
import Navbar from './components/Navbar/Navbar';
import SignIn from './components/SignIn/SignIn';

function App() {
  const [user] = useAuthState(auth as any);

  return (
    <ChakraProvider>
      <div className="App">
        <Navbar user={user} />
        {user ? <Contest /> : <SignIn />}
      </div>
    </ChakraProvider>
  );
}

export default App;
