import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { motion } from 'framer-motion';
import Heading from './Heading';

const StyledModal = styled(motion.div)`
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  display: grid;
  place-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
      stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

interface ModalContextProps {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

interface ModalProps {
  children: ReactNode;
}

interface ModalComponent extends FC<ModalProps> {
  Open: FC<OpenProps>;
  Window: FC<WindowProps>;
}

const Modal: ModalComponent = ({ children }) => {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

interface OpenProps {
  children: ReactNode;
  opens: string;
}

const Open: FC<OpenProps> = ({ children, opens }) => {
  const { open } = useContext(ModalContext)!;

  return React.cloneElement(children as React.ReactElement, {
    onClick: () => open(opens),
  });
};

interface WindowProps {
  children: ReactNode;
  name: string;
  header?: string;
}

const WindowHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
`;

const CloseButton = styled(Button)`
  margin-left: auto;
`;

const Window: FC<WindowProps> = ({ children, name, header }) => {
  const { openName, close } = useContext(ModalContext)!;
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal
        ref={ref}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        <WindowHeader>
          <Heading as='h2'>{header}</Heading>
          <CloseButton onClick={close}>
            <HiXMark />
          </CloseButton>
        </WindowHeader>
        <div>
          {React.cloneElement(children as React.ReactElement, {
            onCloseModal: close,
          })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
