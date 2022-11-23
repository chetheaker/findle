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
import { FaCog } from 'react-icons/fa';
import './SettingsModal.css';

type Props = {
  setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  setColormode: React.Dispatch<React.SetStateAction<boolean>>;
  colormode: boolean;
};

const SettingsModal: React.FC<Props> = ({
  setDarkmode,
  darkMode,
  setColormode,
  colormode
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = () => setDarkmode((prev) => !prev);
  const handleChange = () => setColormode((prev) => !prev);
  return (
    <>
      <button onClick={onOpen}>
        <FaCog color={darkMode ? '#E2E8F0' : 'black'} size="2em" />
      </button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="theme">
              Dark Theme
              <div className="toggle">
                <input
                  type="checkbox"
                  id="checked"
                  className="cbx hidden"
                  onChange={handleClick}
                  defaultChecked={darkMode}
                />
                <label htmlFor="checked" className="lbl"></label>
              </div>
            </div>
            <div className="theme">
              High Contrast Mode
              <div className="toggle">
                <input
                  type="checkbox"
                  id="unchecked"
                  className="cbx hidden"
                  onChange={handleChange}
                  defaultChecked={!colormode}
                />
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
