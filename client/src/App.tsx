import './App.css';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './services/fireBaseInit';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// import components
import Contest from './components/Contest/Contest';
import Navbar from './components/Navbar/Navbar';
import ProfileContext from './ProfileContext';
import { DocumentData } from 'firebase/firestore';
import { createUserStats, getUserStats } from './services/FireStore';

function App() {
  
  const theme = extendTheme({
    components: {
      Modal: {
        baseStyle: () => ({
          dialog: {
            bg: darkmode ? '#12171a' : 'white',
            color: darkmode ? 'white' : 'black'
          }
        })
      }
    }
  });
  const [user] = useAuthState(auth as any);
  const [darkmode, setDarkmode] = useState(true);
  const [colormode, setColormode] = useState(true);
  const root = document.getElementById('root') as HTMLElement;
  const [stats, setStats] = useState<DocumentData | false>(false);
  useEffect(() => {
    if (darkmode) {
      root.style.setProperty('--bg-color', '#12171a');
      root.style.setProperty('--secondary-color', 'white');
    } else {
      root.style.setProperty('--bg-color', 'white');
      root.style.setProperty('--secondary-color', 'black');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkmode]);
  useEffect(() => {
    if (colormode) {
      root.style.setProperty('--correct-color', '#38a169');
      root.style.setProperty('--wrong-color', '#c42f30');
    } else {
      root.style.setProperty('--correct-color', '#85c0f9');
      root.style.setProperty('--wrong-color', '#f5793a');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colormode]);

  useEffect(() => {
    if (!user) return;
    const handleStats = async () => {
      const userStats = (await getUserStats(user!.uid)) as DocumentData;
      setStats(userStats);
      if (!userStats) {
        await createUserStats(user!.uid);
        const userStats = (await getUserStats(user!.uid)) as DocumentData;
        setStats(userStats);
      }
    };
    handleStats();
  }, [user]);

  return (
    <ChakraProvider theme={theme}>
      <ProfileContext.Provider value={[stats, setStats]}>
        <div className="App">
          <Navbar
            user={user}
            setDarkmode={setDarkmode}
            darkMode={darkmode}
            setColormode={setColormode}
            colormode={colormode}
          />
          <Contest />
        </div>
      </ProfileContext.Provider>
    </ChakraProvider>
  );
}

export default App;
