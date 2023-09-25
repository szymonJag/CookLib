import { createContext, useContext, useState } from 'react';
import { IIngredient } from '../interfaces/IIngredient';

interface IngredientsCartContextType {
  ingredients: IIngredient[];
  ingredientsIds: number[];
  isCartVisible: boolean;
  manageCartVisibility: (show: boolean) => void;
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
  isCartVisible: false,
  manageCartVisibility: () => null,
  addIngredient: () => null,
  getIngredient: () => null,
  deleteIngredient: () => null,
});

function IngredientsProvider({ children }: IngredientsProviderProps) {
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
  const ingredientsIds = ingredients.map((x) => x.id);

  const manageCartVisibility = (show: boolean) => {
    setIsCartVisible(show);
  };

  const addIngredient = (ingredient: IIngredient) => {
    setIngredients((prev) => [...prev, ingredient]);
    console.log(`INGREDINETS CONTEXT`, ingredientsIds);
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
        isCartVisible,
        manageCartVisibility,
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
