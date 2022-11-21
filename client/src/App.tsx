import './App.css';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './services/fireBaseInit';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// import components
import Contest from './components/Contest/Contest';
import Navbar from './components/Navbar/Navbar';

function App() {
  const theme = extendTheme({
    components: {
      Modal: {
        baseStyle: () => ({
          dialog: {
            bg: darkmode ? "#12171a" : "white",
            color: darkmode ? "white" : "black"
          }
        })
      }
    }
  });
  const [user] = useAuthState(auth as any);
  const [darkmode, setDarkmode] = useState(true);
  const root = document.getElementById('root') as HTMLElement
  useEffect(()=> {
    if (darkmode) {
      root.style.setProperty("--bg-color", "#12171a");
      root.style.setProperty("--secondary-color", "white");

    } else {
      root.style.setProperty("--bg-color", "white");
      root.style.setProperty("--secondary-color", "black");
    }
  },[darkmode])

  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Navbar user={user} setDarkmode={setDarkmode} darkMode={darkmode} />
        <Contest />
      </div>
    </ChakraProvider>
  );
}

export default App;
