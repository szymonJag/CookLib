import React, { useState } from 'react';
import { IIngredient } from '../../../interfaces/IIngredient';
import Dropdown from '../../../ui/Dropdown';
import Input from '../../../ui/Input';
import IngredientCheckboxes from './IngredientCheckboxes';
import styled from 'styled-components';

const IngredientsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

interface IngredientTypeSectionProps {
  ingredients: IIngredient[];
  ingredientType: string;
}

function IngredientTypeSection({
  ingredients,
  ingredientType,
}: IngredientTypeSectionProps) {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedIngredientTags, setSelectedIngredientTags] = useState<
    number[]
  >([]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleCheckboxClick = (id: number) => {
    setSelectedIngredientTags((prev) => {
      if (prev.includes(id))
        return prev.filter((selectedId) => selectedId !== id);

      return [...prev, id];
    });
  };

  return (
    <Dropdown heading={ingredientType}>
      <IngredientsSection>
        <Input
          placeholder='Wyszukaj składniki...'
          value={searchText}
          onChange={handleSearchInputChange}
        />
        <IngredientCheckboxes
          ingredients={filteredIngredients}
          selectedIngredientTags={selectedIngredientTags}
          onCheckboxClick={handleCheckboxClick}
        />
      </IngredientsSection>
    </Dropdown>
  );
}

export default IngredientTypeSection;