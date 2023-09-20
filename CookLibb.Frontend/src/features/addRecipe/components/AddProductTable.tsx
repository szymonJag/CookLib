import { ChangeEvent, useEffect, useState } from 'react';
import Input from '../../../ui/Input';
import { styled } from 'styled-components';
import { IIngredient } from '../../../interfaces/IIngredient';
import { useIngredients } from '../../admin/hooks/Products/useGetIngredients';
import Table from '../../../ui/Table';
import Select from '../../../ui/Select';
import { IngredientTypes } from '../../../utils/constants';
import Spinner from '../../../ui/Spinner';
import AddProductRow from './AddProductRow';

const InputName = styled(Input)`
  width: 15rem;
`;

const HeaderSearch = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

const TableContainer = styled.div`
  display: flex;
  flex: 1;
`;

interface IngredientsTableProps {
  onAddIngredient: (product: IIngredient) => void;
}

function IngredientsTable({ onAddIngredient }: IngredientsTableProps) {
  const [searchName, setSearchName] = useState<string>('');
  const [selectedType, setSelectedType] = useState<number>(0);
  const { ingredients, isLoading, error } = useIngredients();
  const [filteredProducts, setFilteredProducts] =
    useState<IIngredient[]>(ingredients);

  const fetchError = error ? error.toString() : '';

  useEffect(() => {
    if (ingredients) {
      const filtered = applyFilters(searchName, selectedType);
      setFilteredProducts(filtered);
    }
  }, [searchName, selectedType, ingredients]);

  const searchIngredients = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm: string = e.target.value.toLowerCase();
    setSearchName(searchTerm);
  };

  const selectIIngredient = (e: ChangeEvent<HTMLSelectElement>) => {
    const typeId: number = Number(e.target.value);
    setSelectedType(typeId);
  };

  function applyFilters(searchTerm: string, typeId: number): IIngredient[] {
    return ingredients.filter((ingr) => {
      const nameMatch: boolean = ingr.name.toLowerCase().includes(searchTerm);
      const typeMatch: boolean = typeId === 0 || ingr.type.id === typeId;
      return nameMatch && typeMatch;
    });
  }

  return (
    <TableContainer>
      <Table columns='1fr .5fr 1fr' height='50rem'>
        <Table.Header>
          <HeaderSearch>
            <InputName
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                searchIngredients(e)
              }
              value={searchName}
              placeholder='Nazwa...'
            />
          </HeaderSearch>
          <div>
            <Select
              options={[...IngredientTypes]}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                selectIIngredient(e)
              }
            />
          </div>
          <div>
            <span>Produkty: {filteredProducts && filteredProducts.length}</span>
          </div>
        </Table.Header>

        {isLoading && <Spinner />}

        <Table.Body
          data={filteredProducts}
          error={fetchError}
          render={(ingredient: IIngredient) => (
            <AddProductRow
              product={ingredient}
              key={ingredient.id}
              onAddProduct={() => {
                onAddIngredient(ingredient);
              }}
            />
          )}
        />
      </Table>
    </TableContainer>
  );
}

export default IngredientsTable;
