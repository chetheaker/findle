import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import './ProfileModal.css'
import { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CgProfile } from 'react-icons/cg';
import { auth } from '../../services/fireBaseInit';
import SignOut from '../SignOut/SignOut';
import ProfileContext from '../../ProfileContext';

type Props = {
  darkMode: boolean;
};

const ProfileModal: React.FC<Props> = ({ darkMode }) => {
  const [user] = useAuthState(auth as any);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stats] = useContext(ProfileContext);
  const [topscore, setTopscore] = useState(0);
  const [totalPlayed, setTotalPlayed] = useState(0);
  const [totalFails, setTotalFails] = useState(0);
  const size = 'xl';
  useEffect(()=> {
    if(stats) {
      const scoreArray = Object.entries(stats)
      setTopscore(scoreArray.sort((a, b) => b[1] - a[1])[0][1])
      setTotalPlayed(scoreArray.reduce((acc, cv) => acc + cv[1], 0))
      console.log(scoreArray)
      setTotalFails(scoreArray[scoreArray.findIndex(product => product.some(item => item === 'X'))][1])
    }
  },[stats])
// score / topscore * 100
  return (
    <>
      <button onClick={onOpen}>
        <span>
          <CgProfile color={darkMode ? '#E2E8F0' : 'black'} size="2em" />
        </span>
      </button>
      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <SignOut />
          <ModalHeader>Hello, {user!.displayName!.split(' ')[0]}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='stats'>
              <div>Win percentage: {(totalPlayed - totalFails) / totalPlayed * 100}%</div>
              <div>Total played: {totalPlayed}</div>
            </div>
            <div className='chart'>
            {stats &&
              Object.entries(stats).map((el) => (
                <>
                  <div className='bar-container'>
                    <div className={`bar ${el[0]}`} style={{height: `${(el[1] * 87 / topscore + 13)}%`}} >{el[1]}</div>
                  </div>
                  <div key={el[0]}>{el[0]}</div>
                </>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ProfileModal;
