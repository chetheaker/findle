import HowToModal from '../HowToModal/HowToModal';
import './style.css';

const Navbar:React.FC = () => (
  <div className="navbar">
    <img
      className="navbar_logo"
      src="../../assets/trinity.png"
      alt="netflix logo"
    />
    <HowToModal/>
  </div>
);

export default Navbar;
