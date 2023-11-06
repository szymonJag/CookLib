import { ChangeEvent, useEffect, useState } from 'react';
import Input from '../../../ui/Input';
import Table from '../../../ui/Table';
import { styled } from 'styled-components';
import Select from '../../../ui/Select';
import { IngredientTypes } from '../../../utils/constants';
import { IIngredient } from '../../../interfaces/IIngredient';
import { useIngredients } from '../hooks/useGetIngredients';
import Spinner from '../../../ui/Spinner';
import IngredientRow from './IngredientRow';

const InputName = styled(Input)`
  width: 15rem;
`;

const HeaderSearch = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

interface IProductsTable {
  handleEdit: (product: IIngredient) => void;
}

function ProductsTable({ handleEdit }: IProductsTable) {
  const [searchName, setSearchName] = useState<string>('');
  const [selectedType, setSelectedType] = useState<number>(0);
  const { ingredients, isLoading, error } = useIngredients();
  const [filteredIngredients, setFilteredIngredients] =
    useState<IIngredient[]>(ingredients);

  const fetchError = error ? error.toString() : '';

  useEffect(() => {
    if (ingredients) {
      const filtered = applyFilters(searchName, selectedType);
      setFilteredIngredients(filtered);
    }
  }, [searchName, selectedType, ingredients]);

  const searchIngredients = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm: string = e.target.value.toLowerCase();
    setSearchName(searchTerm);
  };

  const selectProduct = (e: ChangeEvent<HTMLSelectElement>) => {
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

  const handleEditClick = (product: IIngredient) => {
    handleEdit(product);
    console.log('Edit clicked:', product);
  };

  return (
    <Table columns='1fr .5fr 1fr .7fr' height='40rem'>
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
        <div>Kcal</div>
        <div>
          <Select
            options={[...IngredientTypes]}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => selectProduct(e)}
          />
        </div>
        <div>
          <span>
            Produkty: {filteredIngredients && filteredIngredients.length}
          </span>
        </div>
      </Table.Header>

      {isLoading && <Spinner />}

      <Table.Body
        data={filteredIngredients}
        error={fetchError}
        render={(product: IIngredient) => (
          <IngredientRow
            ingredient={product}
            key={product.id}
            onEditClick={handleEditClick}
          />
        )}
      />
    </Table>
  );
}

export default ProductsTable;
