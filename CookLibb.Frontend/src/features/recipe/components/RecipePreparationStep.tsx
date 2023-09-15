import styled from 'styled-components';
import { IPreparationStep } from '../../../interfaces/IPreparationStep';
import PreparationStep from './PreparationStep';
import Heading from '../../../ui/Heading';

const RecipePreparationStepLayout = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

interface RecipePreparationStepProps {
  steps: IPreparationStep[];
}

function RecipePreparationStep({ steps }: RecipePreparationStepProps) {
  console.log(steps);
  return (
    <div>
      <Heading as='h2'>Sposób przygotowania</Heading>
      <RecipePreparationStepLayout>
        {steps.map((step) => (
          <PreparationStep step={step} />
        ))}
      </RecipePreparationStepLayout>
    </div>
  );
}

export default RecipePreparationStep;
