import './Navbar.css';
import HowToModal from '../HowToModal/HowToModal';
import SignOut from '../SignOut/SignOut';
import SignIn from '../SignIn/SignIn';

type NavbarProps = {
  user: any;
};

function Navbar({ user }: NavbarProps) {
  return (
    <div className="navbar">
      <HowToModal />
      <h1>TRINITY</h1>
      {user ? <SignOut /> : <SignIn />}
    </div>
  );
}

export default Navbar;
