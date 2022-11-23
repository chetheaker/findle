import './Navbar.css';
import HowToModal from '../HowToModal/HowToModal';
import SignIn from '../SignIn/SignIn';
import ProfileModal from '../ProfileModal/ProfileModal';
import SettingsModal from '../SettingsModal/SettingsModal';

type NavbarProps = {
  setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  darkMode: boolean;
  setColormode: React.Dispatch<React.SetStateAction<boolean>>;
  colormode: boolean;
};

function Navbar({
  user,
  setDarkmode,
  darkMode,
  setColormode,
  colormode
}: NavbarProps) {
  return (
    <div className="navbar">
      <h1>Findle</h1>
      <div className="right">
        <HowToModal darkMode={darkMode} />
        {user ? <ProfileModal darkMode={darkMode} /> : <SignIn />}
        <SettingsModal
          setDarkmode={setDarkmode}
          darkMode={darkMode}
          setColormode={setColormode}
          colormode={colormode}
        />
      </div>
    </div>
  );
}

export default Navbar;
