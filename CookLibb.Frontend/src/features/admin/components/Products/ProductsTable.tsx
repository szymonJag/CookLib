import { ChangeEvent, useState } from 'react';
import Input from '../../../../ui/Input';
import Table from '../../../../ui/Table';
import ProductRow from './ProductRow';
import { styled } from 'styled-components';
import Select from '../../../../ui/Select';
import { IngredientTypes } from '../../../../utils/constants';
import { IProduct } from '../../../../interfaces/IProduct';
import { useProducts } from '../../hooks/Products/useProducts';
import Spinner from '../../../../ui/Spinner';

const InputName = styled(Input)`
  width: 15rem;
`;

const HeaderSearch = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

function ProductsTable() {
  const [searchName, setSearchName] = useState('');
  const [selectedType, setSelectedType] = useState(0);
  const { products, isLoading } = useProducts();

  let filteredProducts: IProduct[] = products;
  if (isLoading) return <Spinner />;

  console.log(products);

  const searchIngredients = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchName(searchTerm);

    filteredProducts = applyFilters(searchTerm, selectedType);
    // setFilteredIngredients(filtered);
  };

  const selectProduct = (e: ChangeEvent<HTMLSelectElement>) => {
    const typeId = Number(e.target.value);
    setSelectedType(typeId);

    filteredProducts = applyFilters(searchName, typeId);
    // setFilteredIngredients(filtered);
  };

  const applyFilters = (searchTerm: string, typeId: number): IProduct[] => {
    filteredProducts = products.filter((ingr) => {
      const nameMatch = ingr.name.toLowerCase().includes(searchTerm);
      const typeMatch = typeId === 0 || ingr.type.id === typeId;
      return nameMatch && typeMatch;
    });

    return filteredProducts;
  };

  return (
    <Table columns='1fr .5fr 1fr .7fr'>
      <Table.Header>
        <HeaderSearch>
          <InputName
            onChange={(e) => searchIngredients(e)}
            value={searchName}
            placeholder='Nazwa...'
          />
        </HeaderSearch>
        <div>Kcal</div>
        <div>
          <Select
            options={[{ id: 0, name: 'Typ produktu' }, ...IngredientTypes]}
            onChange={(e) => selectProduct(e)}
          />
        </div>
        <div></div>
      </Table.Header>

      {isLoading && <Spinner />}

      <Table.Body
        data={filteredProducts}
        render={(ingr) => <ProductRow product={ingr} key={ingr.id} />}
      />
    </Table>
  );
}

export default ProductsTable;
