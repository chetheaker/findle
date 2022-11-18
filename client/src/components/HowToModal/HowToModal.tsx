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
  } from '@chakra-ui/react'
import React from 'react'

const HowToModal:React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen}>How to play</Button>
  
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>How to play</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>Trinity generates 2 random words. <br></br>
        You create an AI-based image with a prompt. <br></br>
        (must include the words) <br></br>
        The coolest image wins! <br></br></div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default HowToModal;