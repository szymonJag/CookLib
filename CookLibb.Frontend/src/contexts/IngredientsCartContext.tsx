import { createContext, useContext, useState } from 'react';
import { IIngredient } from '../interfaces/IIngredient';

interface IngredientsCartContextType {
  ingredients: IIngredient[];
  ingredientsIds: number[];
  addIngredient: (ingredient: IIngredient) => void;
  getIngredient: (ingredientId: number) => void;
  deleteIngredient: (ingredientId: number) => void;
}

interface IngredientsProviderProps {
  children: React.ReactNode;
}

const IngredientsContext = createContext<IngredientsCartContextType>({
  ingredients: [],
  ingredientsIds: [],
  addIngredient: () => null,
  getIngredient: () => null,
  deleteIngredient: () => null,
});

function IngredientsProvider({ children }: IngredientsProviderProps) {
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const ingredientsIds = ingredients.map((x) => x.id);

  const addIngredient = (ingredient: IIngredient) => {
    setIngredients((prev) => [...prev, ingredient]);
  };

  const deleteIngredient = (id: number) => {
    if (ingredientsIds.includes(id))
      setIngredients((prev) => prev.filter((ingr) => ingr.id !== id));
  };

  const getIngredient = (id: number) => {
    if (ingredientsIds.includes(id))
      return ingredients.find((ingr) => ingr.id === id);
  };

  return (
    <IngredientsContext.Provider
      value={{
        ingredients,
        addIngredient,
        deleteIngredient,
        getIngredient,
        ingredientsIds,
      }}
    >
      {children}
    </IngredientsContext.Provider>
  );
}

function useIngredientsContext() {
  const context = useContext(IngredientsContext);
  if (context === undefined)
    throw new Error('useIngredients must be used within a IngredientsProvider');

  return context;
}

export { IngredientsProvider, useIngredientsContext };
