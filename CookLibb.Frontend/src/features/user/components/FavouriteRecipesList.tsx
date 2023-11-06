import styled from 'styled-components';
import { IShortRecipe } from '../../../interfaces/IRecipe';
import Table from '../../../ui/Table';
import FavouriteRecipeRow from './FavouriteRecipeRow';

const TableHeaderText = styled.span`
  text-align: center;
`;

interface FavouriteRecipeListProps {
  shortRecipeList: IShortRecipe[];
}

function FavouriteRecipeList({ shortRecipeList }: FavouriteRecipeListProps) {
  return (
    <Table columns=' 1.2fr 1fr 1.5fr' height='60rem'>
      <Table.Header>
        <TableHeaderText>Galeria</TableHeaderText>
        <TableHeaderText>Nazwa</TableHeaderText>
        <TableHeaderText>Akcja</TableHeaderText>
      </Table.Header>
      <Table.Body
        data={shortRecipeList}
        error='Brak ulubionych przepisów'
        render={(recipe: IShortRecipe) => (
          <FavouriteRecipeRow shortRecipe={recipe} key={recipe.id} />
        )}
      />
    </Table>
  );
}

export default FavouriteRecipeList;
