import { ChangeEvent, useEffect, useState } from 'react';
import Input from '../../../../ui/Input';
import Table from '../../../../ui/Table';
import ProductRow from './ProductRow';
import { styled } from 'styled-components';
import Select from '../../../../ui/Select';
import { IngredientTypes } from '../../../../utils/constants';
import { IProduct } from '../../../../interfaces/IProduct';
import { useProducts } from '../../hooks/Products/useGetProducts';
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

interface IProductsTable {
  handleEdit: (product: IProduct) => void;
}

function ProductsTable({ handleEdit }: IProductsTable) {
  const [searchName, setSearchName] = useState<string>('');
  const [selectedType, setSelectedType] = useState<number>(0);
  const { products, isLoading, error } = useProducts();
  const [filteredProducts, setFilteredProducts] =
    useState<IProduct[]>(products);

  const fetchError = error ? error.toString() : '';

  useEffect(() => {
    if (products) {
      const filtered = applyFilters(searchName, selectedType);
      setFilteredProducts(filtered);
    }
  }, [searchName, selectedType, products]);

  const searchIngredients = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm: string = e.target.value.toLowerCase();
    setSearchName(searchTerm);
  };

  const selectProduct = (e: ChangeEvent<HTMLSelectElement>) => {
    const typeId: number = Number(e.target.value);
    setSelectedType(typeId);
  };

  function applyFilters(searchTerm: string, typeId: number): IProduct[] {
    return products.filter((ingr) => {
      const nameMatch: boolean = ingr.name.toLowerCase().includes(searchTerm);
      const typeMatch: boolean = typeId === 0 || ingr.type.id === typeId;
      return nameMatch && typeMatch;
    });
  }

  const handleEditClick = (product: IProduct) => {
    handleEdit(product);
    console.log('Edit clicked:', product);
  };

  return (
    <Table columns='1fr .5fr 1fr .7fr'>
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
          <span>Produkty: {filteredProducts && filteredProducts.length}</span>
        </div>
      </Table.Header>

      {isLoading && <Spinner />}

      <Table.Body
        data={filteredProducts}
        error={fetchError}
        render={(ingr: IProduct) => (
          <ProductRow
            product={ingr}
            key={ingr.id}
            onEditClick={handleEditClick}
          />
        )}
      />
    </Table>
  );
}

export default ProductsTable;
