import styled from 'styled-components';
import Table from './Table';
import { IShortRecipe } from '../interfaces/IRecipe';
import RecipeRow from './RecipeRow';

const TableHeaderText = styled.span`
  text-align: center;
`;

interface RecipesTableProps {
  recipes: IShortRecipe[];
}

function RecipesTable({ recipes }: RecipesTableProps) {
  return (
    <Table columns='1.2fr 1fr 1fr 1.5fr' height='50rem'>
      <Table.Header>
        <TableHeaderText>Galeria</TableHeaderText>
        <TableHeaderText>Nazwa</TableHeaderText>
        <TableHeaderText>Status</TableHeaderText>
        <TableHeaderText>Akcja</TableHeaderText>
      </Table.Header>
      <Table.Body
        data={recipes}
        error='Brak przepisów'
        render={(recipe: IShortRecipe) => <RecipeRow recipe={recipe} />}
      />
    </Table>
  );
}

export default RecipesTable;
