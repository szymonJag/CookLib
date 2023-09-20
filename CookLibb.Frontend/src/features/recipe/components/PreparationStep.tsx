import styled from 'styled-components';
import { IPreparationStep } from '../../../interfaces/IPreparationStep';
import Heading from '../../../ui/Heading';

const PreparationStepLayout = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid var(--color-grey-200);
  padding: 1rem;
`;

const PreparationStepDescription = styled.p`
  padding: 1rem;
  background-color: var(--color-grey-200);
  margin-top: 1rem;
`;

const PreparationHeading = styled(Heading)``;

interface PreparationStepProps {
  step: IPreparationStep;
}

function PreparationStep({ step }: PreparationStepProps) {
  return (
    <PreparationStepLayout>
      <PreparationHeading as='h2'>Krok {step.step}</PreparationHeading>
      <PreparationStepDescription>
        {step.description}
      </PreparationStepDescription>
    </PreparationStepLayout>
  );
}

export default PreparationStep;
