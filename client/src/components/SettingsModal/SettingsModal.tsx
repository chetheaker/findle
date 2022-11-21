import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react';
  import React from 'react';
  import { FaCog } from 'react-icons/fa';
  import './SettingsModal.css'
  
  type Props = {
    setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
    darkMode:boolean;
  }

  const SettingsModal: React.FC<Props> = ({setDarkmode, darkMode}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleClick = () => setDarkmode(prev => !prev)
    const handleChange = () => setDarkmode(prev => !prev)
    return (
      <>
        <button onClick={onOpen}>
          <FaCog color={darkMode ? "#E2E8F0" : "black"} size="2em" />
        </button>
  
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>How to play</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <div className="theme">
                    Dark Theme
                    <div className="toggle">
                        <input type="checkbox" id="checked" className="cbx hidden" onChange={handleClick} defaultChecked={darkMode} />
                        <label htmlFor="checked" className="lbl"></label>
                    </div>
                </div>
                <div className="theme">
                    Color Theme
                    <div className="toggle">
                        <input type="checkbox" id="unchecked" className="cbx hidden" onChange={handleChange} defaultChecked={!darkMode} />
                        <label htmlFor="unchecked" className="lbl"></label>
                    </div>
                </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default SettingsModal;