import './Navbar.css';
import HowToModal from '../HowToModal/HowToModal';
import SignIn from '../SignIn/SignIn';
import ProfileModal from '../ProfileModal/ProfileModal';
import SettingsModal from '../SettingsModal/SettingsModal';

type NavbarProps = {
  setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  darkMode:boolean;
};

function Navbar({ user, setDarkmode, darkMode }: NavbarProps) {
  return (
    <div className="navbar">
      <h1>TRINITY</h1>
      <div className='right'>
        <HowToModal darkMode={darkMode} />
        {user ? <ProfileModal darkMode={darkMode} /> : <SignIn />}
        <SettingsModal setDarkmode={setDarkmode} darkMode={darkMode} />
      </div>
    </div>
  );
}

export default Navbar;
