import styled from 'styled-components';
import { IShortRecipe } from '../../../interfaces/IRecipe';
import Table from '../../../ui/Table';
import CreatedRecipeRow from './CreatedRecipeRow';

const TableHeaderText = styled.span`
  text-align: center;
`;

interface CreatedRecipeListProps {
  shortRecipeList: IShortRecipe[];
}

function CreatedRecipesList({ shortRecipeList }: CreatedRecipeListProps) {
  return (
    <Table columns=' 1.2fr 1fr 1.5fr' height='60rem'>
      <Table.Header>
        <TableHeaderText>Galeria</TableHeaderText>
        <TableHeaderText>Nazwa</TableHeaderText>
        <TableHeaderText>Akcja</TableHeaderText>
      </Table.Header>
      <Table.Body
        data={shortRecipeList}
        error='Brak dodanych przepisów'
        render={(recipe: IShortRecipe) => (
          <CreatedRecipeRow shortRecipe={recipe} key={recipe.id} />
        )}
      ></Table.Body>
    </Table>
  );
}

export default CreatedRecipesList;
