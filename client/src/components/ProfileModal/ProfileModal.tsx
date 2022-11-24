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
import { CgProfile } from 'react-icons/cg';
import SignOut from '../SignOut/SignOut';
import ProfileContext from '../../ProfileContext';

type Props = {
  darkMode: boolean;
};

const ProfileModal: React.FC<Props> = ({ darkMode }) => {
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
          <ModalHeader fontSize="2rem">Statistics</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='stats'>
            <div className='history'>
              <div>
                <div className='number'>{(Math.round((totalPlayed - totalFails) / totalPlayed * 1000) / 10)}</div>
                <div>WIN%</div>
              </div>
              <div>
                <div className='number'>{totalPlayed}</div>
                <div>Played</div>
              </div>
              </div>
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
            <SignOut />
            <Button onClick={onClose} color="black" backgroundColor="lightgray" marginRight="10px">Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ProfileModal;
