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
import ImageCard from '../ImageCard/ImageCard'

const ShareModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const size = 'xl'
    const image = 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/1200px-Flag_of_Sweden.svg.png'
    return (
      <>
          <Button
            key={size}
            m={4}
          >{`Open ${size} Modal`}</Button>
  
        <Modal onClose={onClose} size={size} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <ImageCard imageUrl={image} />
              <div>Share this shit</div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }