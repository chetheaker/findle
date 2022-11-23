import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Spinner
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CgProfile } from 'react-icons/cg';
import { auth } from '../../services/fireBaseInit';
import SignOut from '../SignOut/SignOut';
import { createUserStats, getUserStats } from '../../services/FireStore';
import { DocumentData } from 'firebase/firestore';

type Props = {
  darkMode: boolean;
};

const ProfileModal: React.FC<Props> = ({ darkMode }) => {
  const [user] = useAuthState(auth as any);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stats, setStats] = useState<DocumentData>({});
  const size = 'xl';

  useEffect(() => {
    const handleStats = async () => {
      const userStats = (await getUserStats(user!.uid)) as DocumentData;
      setStats(userStats);
      if (!userStats) {
        await createUserStats(user!.uid);
      }
      setIsLoading(false);
    };
    handleStats();
  }, [user]);

  return (
    <>
      <button onClick={onOpen}>
        <span>
          <CgProfile color={darkMode ? '#E2E8F0' : 'black'} size="2em" />
        </span>
      </button>

      {isLoading ? (
        <Spinner />
      ) : (
        <Modal onClose={onClose} size={size} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <SignOut />
            <ModalHeader>Hello, {user!.displayName!.split(' ')[0]}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {Object.entries(stats).map((el) => (
                <h1>
                  {el[0]} - {el[1]}
                </h1>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
export default ProfileModal;
