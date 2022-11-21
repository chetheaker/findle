import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    DarkMode
  } from '@chakra-ui/react';
  import React from 'react';
  import { AiFillQuestionCircle } from 'react-icons/ai';
  import './SettingsModal.css'
  
  type Props = {
    setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
    darkMode:boolean;
  }

  const SettingsModal: React.FC<Props> = ({setDarkmode, darkMode}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleClick = () => setDarkmode(prev => !prev)
    return (
      <>
        <button onClick={onOpen}>
          <AiFillQuestionCircle color={darkMode ? "#E2E8F0" : "black"} size="2em" />
        </button>
  
        <Modal background-color={darkMode ? "#E2E8F0" : "black"} onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>How to play</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <div className="toggle">
                    <input type="checkbox" id="unchecked" className="cbx hidden" onChange={handleClick} defaultChecked={darkMode} />
                    <label htmlFor="unchecked" className="lbl"></label>
                </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default SettingsModal;