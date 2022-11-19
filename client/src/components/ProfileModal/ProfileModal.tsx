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

const ProfileModal:React.FC = () => {
    //props 
    const image = 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/1200px-Flag_of_Sweden.svg.png'
    const name = 'Hello World'
    const score = 5
    const images = ['https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/1200px-Flag_of_Sweden.svg.png', 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/1200px-Flag_of_Sweden.svg.png', 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/1200px-Flag_of_Sweden.svg.png']

    const { isOpen, onOpen, onClose } = useDisclosure()
    const size = 'xl'
    return (
      <>
          <Button
            key={size}
            m={4}
          >{`Open ${size} Modal`}</Button>
  
        <Modal onClose={onClose} size={size} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <ImageCard imageUrl={image} />
              <div>{name}</div>
              <div>{score}</div>
              <div>Your images</div>
              <div>{images.map(image => {
                return <img src={image}/>
                })}</div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
export default ProfileModal;