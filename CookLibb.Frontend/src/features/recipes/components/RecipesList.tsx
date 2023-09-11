import { useEffect, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import RecipeCard from './RecipeCard';
import { useGetRecipes } from '../hooks/useGetShortRecipes';
import { IShortRecipe } from '../../../interfaces/IRecipe';
import Heading from '../../../ui/Heading';
import Spinner from '../../../ui/Spinner';
import Input from '../../../ui/Input';
import RecipeTagsCheckboxes from './RecipeTagsCheckboxes';
import { FormSection } from '../../addRecipe/components/AddRecipeForm';

const RecipesListLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
`;

const RecipeCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  justify-items: center;
`;

function RecipesList() {
  const { recipes, isLoading } = useGetRecipes();
  const [filteredRecipes, setFilteredRecipes] = useState<IShortRecipe[]>(
    recipes || []
  );

  const [searchName, setSearchName] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  useEffect(() => {
    if (recipes) {
      const filtered = applyFilters(recipes, searchName, selectedTags);
      setFilteredRecipes(filtered);
    }
  }, [recipes, searchName, selectedTags]);

  const handleSearchName = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm: string = e.target.value.toLowerCase();
    setSearchName(searchTerm);
  };

  const handleSelectTags = (id: number) => {
    console.log(`selectedTags`, selectedTags);
    setSelectedTags((prev) =>
      prev.includes(id)
        ? prev.filter((tagId) => tagId !== id)
        : [...selectedTags, id]
    );
  };

  function applyFilters(
    recipes: IShortRecipe[],
    searchTerm: string,
    tags: number[]
  ): IShortRecipe[] {
    return recipes.filter((recipe) => {
      const nameMatch: boolean = recipe.name.toLowerCase().includes(searchTerm);
      const tagMatch: boolean =
        tags.length === 0 || // If no tags are selected, don't filter by tags
        recipe.recipeTags.some((tag) => tags.includes(tag.tagId));
      return nameMatch && tagMatch;
    });
  }

  return (
    <RecipesListLayout>
      <FormSection orientation='column'>
        <RecipeTagsCheckboxes
          onTagCheckboxChange={handleSelectTags}
          selectedTags={selectedTags}
        />
      </FormSection>
      <Input
        type='text'
        value={searchName}
        onChange={handleSearchName}
        placeholder='Szukaj przepisu...'
      />
      {isLoading ? (
        <>
          <Heading as='h1'>Trwa ładowanie przepisów</Heading>
          <Spinner />
        </>
      ) : (
        <RecipeCardList>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                recipeTags={selectedTags}
              />
            ))
          ) : (
            <Heading as='h1'>Brak dostępnych przepisów</Heading>
          )}
        </RecipeCardList>
      )}
    </RecipesListLayout>
  );
}

export default RecipesList;

// function applyFilters(searchTerm: string, tags: number[]): IShortRecipe[] {
//   return recipes.filter((ingr) => {
//     const nameMatch: boolean = ingr.name.toLowerCase().includes(searchTerm);
//     const typeMatch: boolean = typeId === 0 || ingr.type.id === typeId;
//     return nameMatch && typeMatch;
//   });
// }
