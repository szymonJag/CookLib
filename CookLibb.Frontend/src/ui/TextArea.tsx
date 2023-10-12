import { styled } from 'styled-components';
import { MouseEvent } from 'react';
import Heading from './Heading';
import Button from './Button';

const CommonTextAreaLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;
`;

const CommonArea = styled.textarea`
  height: 10rem;
  padding: 1rem;
`;

const CommonTextAreaHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface CommonTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  header?: string;
  index?: number;
  handleRemove?: (index: number) => void;
}

function TextArea({
  value,
  onChange,
  header,
  index,
  handleRemove,
}: CommonTextAreaProps) {
  return (
    <CommonTextAreaLayout>
      {index !== undefined && (
        <CommonTextAreaHeader>
          <Heading as='h3'>Krok {index + 1}</Heading>
          {index > 0 && (
            <Button
              size='small'
              onClick={(e: MouseEvent) => {
                e.preventDefault();
                handleRemove && handleRemove(index);
              }}
            >
              Usuń
            </Button>
          )}
        </CommonTextAreaHeader>
      )}
      {header && <CommonTextAreaHeader>{header}</CommonTextAreaHeader>}
      <CommonArea value={value} onChange={(e) => onChange(e.target.value)} />
    </CommonTextAreaLayout>
  );
}

export default TextArea;
