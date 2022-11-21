import './Navbar.css';
import HowToModal from '../HowToModal/HowToModal';
import SignOut from '../SignOut/SignOut';
import SignIn from '../SignIn/SignIn';
import ProfileModal from '../ProfileModal/ProfileModal';
import SettingsModal from '../SettingsModal/SettingsModal';

type NavbarProps = {
  setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
};

function Navbar({ user, setDarkmode }: NavbarProps) {
  return (
    <div className="navbar">
      <h1>TRINITY</h1>
      <div className='right'>
        <HowToModal />
        {user ? <ProfileModal /> : <SignIn />}
        <SettingsModal setDarkmode={setDarkmode} />
      </div>
    </div>
  );
}

export default Navbar;
