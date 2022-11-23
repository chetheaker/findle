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
import { useContext } from 'react';
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
  const size = 'xl';

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
            {stats &&
              Object.entries(stats).map((el) => (
                <h1 key={el[0]}>
                  {el[0]} - {el[1]}
                </h1>
              ))}
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
