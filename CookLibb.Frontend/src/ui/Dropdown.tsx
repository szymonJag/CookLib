import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion
import Heading from './Heading';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

const DropdownLayout = styled.div`
  width: 100%;
  border: 2px solid var(--color-grey-200);
`;

const DropdownBody = styled(motion.div)`
  max-height: 0;
  overflow: auto;
  padding: 1rem;
  background-color: var(--color-grey-50);
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: var(--color-grey-200);
  padding: 0.5rem 1rem;
`;

interface RecipeTagsCheckboxesProps {
  children: React.ReactNode;
  heading: string;
  defaultOpen?: boolean;
}

function RecipeTagsCheckboxes({
  children,
  heading,
  defaultOpen,
}: RecipeTagsCheckboxesProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);

  return (
    <DropdownLayout>
      <DropdownHeader onClick={() => setIsOpen((prev) => !prev)}>
        <Heading as='h2'>{heading}</Heading>
        {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
      </DropdownHeader>
      <AnimatePresence initial={false}>
        {isOpen && (
          <DropdownBody
            initial={{ maxHeight: 0, opacity: 0 }}
            animate={{ maxHeight: '100vh', opacity: 1 }}
            exit={{ maxHeight: 0, opacity: 0 }}
          >
            {children}
          </DropdownBody>
        )}
      </AnimatePresence>
    </DropdownLayout>
  );
}

export default RecipeTagsCheckboxes;
