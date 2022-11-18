import './App.css';
import React from 'react';
import { auth } from './services/fireBaseInit';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ChakraProvider } from '@chakra-ui/react';

// import components
import Contest from './components/Contest/Contest';
import Navbar from './components/Navbar/Navbar';
import SignOut from './components/SignOut/SignOut';
import SignIn from './components/SignIn/SignIn';

function App() {
  const [user] = useAuthState(auth as any);

  return (
    <ChakraProvider>
      <div className="App">
        <Navbar />
        <SignOut auth={auth} />
        {user ? <Contest /> : <SignIn auth={auth} />}
      </div>
    </ChakraProvider>
  );
}

export default App;
