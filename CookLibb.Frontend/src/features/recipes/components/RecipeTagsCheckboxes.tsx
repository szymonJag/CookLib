import styled from 'styled-components';
import Checkboxes from '../../addRecipe/components/Checkboxes';
import { useState } from 'react';
import Button from '../../../ui/Button';
import Heading from '../../../ui/Heading';

const RecipeTagsCheckboxesLayout = styled.div``;

interface ToggleProps {
  isOpen: boolean;
}

// const Toggle = styled.div<ToggleProps>`
//   height: ${(props) => (props.isOpen ? '100%' : '0')};
//   overflow: hidden;
//   transition: height 0.3s ease;
//   animation: ${toggleAnimation} 0.3s ease forwards;
// `;

const ToggleContainer = styled.div<ToggleProps>`
  max-height: ${(props) => (props.isOpen ? '100vh' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const RecipeTagsHeader = styled.div`
  display: flex;
  padding: 1rem 0;
  margin-bottom: 1rem;
  justify-content: space-between;
`;

interface RecipeTagsCheckboxesProps {
  selectedTags: number[];
  onTagCheckboxChange: (tagId: number) => void;
}

function RecipeTagsCheckboxes({
  onTagCheckboxChange,
  selectedTags,
}: RecipeTagsCheckboxesProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <RecipeTagsCheckboxesLayout>
      <RecipeTagsHeader>
        <Heading as='h2'>Tagi</Heading>
        <Button size='small' onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? 'Schowaj' : 'Pokaż'}
        </Button>
      </RecipeTagsHeader>
      <ToggleContainer isOpen={isOpen}>
        <Checkboxes
          selectedTags={selectedTags}
          onTagCheckboxChange={onTagCheckboxChange}
        />
      </ToggleContainer>
    </RecipeTagsCheckboxesLayout>
  );
}

export default RecipeTagsCheckboxes;
