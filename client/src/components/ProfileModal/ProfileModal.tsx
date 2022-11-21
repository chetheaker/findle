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
import { CgProfile } from 'react-icons/cg';

const ProfileModal: React.FC = () => {
  const name = 'Hello World';
  const score = 5;
  const images = [
    'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/1200px-Flag_of_Sweden.svg.png',
    'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/1200px-Flag_of_Sweden.svg.png',
    'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/1200px-Flag_of_Sweden.svg.png'
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const size = 'xl';
  return (
    <>
      <button onClick={onOpen}>
        <span>
          <CgProfile color="white" size="2em" />
        </span>
      </button>

      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>{name}</div>
            <div>{score}</div>
            <div>Your images</div>
            <div>
              {images.map((image, index) => {
                return <img src={image} key={index} alt="" />;
              })}
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
