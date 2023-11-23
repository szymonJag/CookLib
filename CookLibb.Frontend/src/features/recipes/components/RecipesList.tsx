import { useEffect, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import RecipeCard from './RecipeCard';
import { useGetShortRecipes } from '../hooks/useGetShortRecipes';
import { IShortRecipe } from '../../../interfaces/IRecipe';
import Heading from '../../../ui/Heading';
import Spinner from '../../../ui/Spinner';
import Input from '../../../ui/Input';
import RecipeTagsCheckboxes from './RecipeTagsCheckboxes';
import IngredientSearchOperations from './IngredientSearchOperations';
import { useIngredientsContext } from '../../../contexts/IngredientsCartContext';
import { PageSection } from '../../../ui/PageSection';

const RecipesListLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
`;

const RecipeCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  grid-gap: 1rem;
  justify-items: center;
`;

const FilterSection = styled(PageSection)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: transparent;
  padding: 0;
`;

function RecipesList() {
  const { recipes, isLoading } = useGetShortRecipes();
  const [filteredRecipes, setFilteredRecipes] = useState<IShortRecipe[]>(
    recipes || []
  );
  const [matchingRecipes, setMatchingRecipes] = useState<IShortRecipe[]>([]);
  const [searchName, setSearchName] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [isSearchingByIngredients, setIsSearchingByIngredients] =
    useState<boolean>(false);
  const ingredientsContext = useIngredientsContext();
  const selectedIngredientsIds = ingredientsContext.ingredientsIds;

  useEffect(() => {
    if (recipes) {
      const filtered = isSearchingByIngredients
        ? applyFilters(matchingRecipes, searchName, selectedTags)
        : applyFilters(recipes, searchName, selectedTags);
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

  const handleResetButton = () => {
    setIsSearchingByIngredients(false);
    setFilteredRecipes(recipes);
    setMatchingRecipes([]);
  };

  const handleSearchButton = () => {
    setIsSearchingByIngredients(true);
    const filteredRecipes = recipes.filter((recipe) => {
      const matchingIngredients = recipe.ingredientsIds.filter((ingr) =>
        selectedIngredientsIds.includes(ingr)
      );
      return matchingIngredients.length >= 2;
    });

    setFilteredRecipes(filteredRecipes);
    setMatchingRecipes(filteredRecipes);
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
      <FilterSection orientation='column'>
        <IngredientSearchOperations
          onResetButton={handleResetButton}
          onSearchButton={handleSearchButton}
        />
        <RecipeTagsCheckboxes
          onTagCheckboxChange={handleSelectTags}
          selectedTags={selectedTags}
        />
      </FilterSection>
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
