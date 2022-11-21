import './Navbar.css';
import HowToModal from '../HowToModal/HowToModal';
import SignOut from '../SignOut/SignOut';
import SignIn from '../SignIn/SignIn';
import ProfileModal from '../ProfileModal/ProfileModal';

type NavbarProps = {
  user: any;
};

function Navbar({ user }: NavbarProps) {
  return (
    <div className="navbar">
      <h1>TRINITY</h1>
      <div className='right'>
        <HowToModal />
        {user ? <ProfileModal /> : <SignIn />}
        <div>⚙️</div>
      </div>
    </div>
  );
}

export default Navbar;
