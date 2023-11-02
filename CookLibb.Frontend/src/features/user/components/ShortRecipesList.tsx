import styled from 'styled-components';
import { IShortRecipe } from '../../../interfaces/IRecipe';
import Table from '../../../ui/Table';
import ShortRecipeRow from './ShortRecipeRow';

const TableHeaderText = styled.span`
  text-align: center;
`;

interface ShortRecipeListProps {
  shortRecipeList: IShortRecipe[];
}

function ShortRecipeList({ shortRecipeList }: ShortRecipeListProps) {
  return (
    <Table columns='1fr 1.5fr 1.5fr' height='60rem'>
      <Table.Header>
        <TableHeaderText>Galeria</TableHeaderText>
        <TableHeaderText>Nazwa</TableHeaderText>
        <TableHeaderText>Akcja</TableHeaderText>
      </Table.Header>
      <Table.Body
        data={shortRecipeList}
        error='Brak ulubionych przepisów'
        render={(recipe: IShortRecipe) => (
          <ShortRecipeRow shortRecipe={recipe} key={recipe.id} />
        )}
      ></Table.Body>
    </Table>
  );
}

export default ShortRecipeList;
