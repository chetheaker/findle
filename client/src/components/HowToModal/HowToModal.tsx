import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';

const HowToModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button onClick={onOpen}>
        <AiFillQuestionCircle color="#E2E8F0" size="2em" />
      </button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>How to play</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              Trinity generates 2 random words You create an AI-based image with
              a prompt. (must include the words) The coolest image wins!
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HowToModal;
