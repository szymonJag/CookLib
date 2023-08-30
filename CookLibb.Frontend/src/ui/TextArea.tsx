import { styled } from 'styled-components';
import Heading from './Heading';
import { MouseEvent } from 'react';
import Button from './Button';

const TextAreaLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;
`;

const Area = styled.textarea`
  height: 10rem;
  padding: 1rem;
`;

const TextAreaHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  index: number;
  handleRemove: (index: number) => void;
}

function TextArea({ value, onChange, index, handleRemove }: TextAreaProps) {
  return (
    <TextAreaLayout>
      <TextAreaHeader>
        <Heading as='h3'>Krok {index + 1}</Heading>

        {index > 0 && (
          <Button
            size='small'
            onClick={(e: MouseEvent) => {
              e.preventDefault();
              handleRemove(index);
            }}
          >
            Usuń
          </Button>
        )}
      </TextAreaHeader>
      <Area value={value} onChange={(e) => onChange(e.target.value)} />
    </TextAreaLayout>
  );
}

export default TextArea;
