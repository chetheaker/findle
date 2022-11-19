import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import ImageCard from '../ImageCard/ImageCard';

type ShareProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ShareModal = ({ onClose, isOpen }: ShareProps) => {
  const size = 'xl';
  const image =
    'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/1200px-Flag_of_Sweden.svg.png';
  return (
    <Modal onClose={onClose} size={size} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ImageCard imageUrl={image} />
          <div>Share this shit</div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
