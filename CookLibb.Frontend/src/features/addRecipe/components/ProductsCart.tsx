import { styled } from 'styled-components';
import Table from '../../../ui/Table';
import { IIngredientMeasuremenet } from '../../../interfaces/IIngredientMeasurement';
import ProductCartRow from './ProductCartRow';

const ProductsCartLayout = styled.div`
  flex: 1;
`;

const TableStyled = styled(Table)`
  align-self: flex-start;
`;

interface ProductsCartProps {
  products: IIngredientMeasuremenet[];
  onDeleteButton: (productId: number) => void;
  onSelectButton: (measurementId: number, productId: number) => void;
  onValueChange: (value: number, productId: number) => void;
}

function ProductsCart({
  products,
  onDeleteButton,
  onSelectButton,
  onValueChange,
}: ProductsCartProps) {
  console.log(`products`, products);

  return (
    <ProductsCartLayout>
      <TableStyled columns='.2fr 1fr 1fr .7fr' height='50rem'>
        <Table.Header>
          <span></span>
          <span>Nazwa</span>
          <span>Miara</span>
          <span>Ilość</span>
        </Table.Header>

        <Table.Body
          data={products}
          error={'Dodaj produkty z listy obok'}
          render={(product: IIngredientMeasuremenet) => (
            <ProductCartRow
              onValueChange={(value: number) =>
                onValueChange(value, product.product.id)
              }
              product={product}
              key={product.product.id}
              onDeleteButton={() => {
                onDeleteButton(product.product.id);
              }}
              onSelectButton={(measurementId, productId) =>
                onSelectButton(measurementId, productId)
              }
            />
          )}
        />
      </TableStyled>
    </ProductsCartLayout>
  );
}

export default ProductsCart;
