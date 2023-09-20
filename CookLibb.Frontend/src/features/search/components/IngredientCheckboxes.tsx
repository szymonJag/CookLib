import styled from 'styled-components';
import { IIngredient } from '../../../interfaces/IIngredient';
import Checkbox from '../../../ui/Checkbox';

const IngredientCheckboxesLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 2rem;
`;

interface IngredientCheckboxesProps {
  ingredients: IIngredient[];
  selectedIngredientTags: number[];
  onCheckboxClick: (id: number) => void;
}

function IngredientCheckboxes({
  ingredients,
  selectedIngredientTags,
  onCheckboxClick,
}: IngredientCheckboxesProps) {
  const handleCheckboxClick = (id: number) => {
    onCheckboxClick(id);
  };

  return (
    <IngredientCheckboxesLayout>
      {ingredients.map((ingr) => (
        <Checkbox
          label={ingr.name}
          key={ingr.id}
          checked={selectedIngredientTags.includes(ingr.id)}
          onChange={() => handleCheckboxClick(ingr.id)}
        />
      ))}
    </IngredientCheckboxesLayout>
  );
}

export default IngredientCheckboxes;
