import React, { useContext, ReactNode, FC } from 'react';
import styled from 'styled-components';

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
  height: 40rem;
`;

interface CommonRowProps {
  columns: string;
  children: ReactNode;
}

const CommonRow = styled.header<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  position: sticky;
  top: 0;
  z-index: 1;
`;

const StyledBody = styled.section<{ maxHeight: string }>`
  margin: 0.4rem 0;
  overflow-y: auto;
  max-height: ${(props) => props.maxHeight}; // Apply maxHeight
`;

const StyledRow = styled(CommonRow)`
  padding: 1rem;
  transition: all 0.2s;
  margin: 0.5rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:hover {
    background-color: rgb(224, 224, 224);
  }
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

interface TableContextProps {
  columns: string;
  height: string;
}

const TableContext = React.createContext<TableContextProps | undefined>(
  undefined
);

interface TableProps {
  columns: string;
  height: string;
  children: ReactNode;
}

interface TableStaticProps {
  Header: FC<HeaderProps>;
  Body: typeof Body;
  Row: typeof Row;
  Footer: typeof Footer;
}

const Table: FC<TableProps> & TableStaticProps = ({
  columns,
  height,
  children,
}) => {
  return (
    <TableContext.Provider value={{ columns, height }}>
      <StyledTable role='table' style={{ height }}>
        {children}
      </StyledTable>
    </TableContext.Provider>
  );
};
interface HeaderProps {
  children: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  const { columns } = useContext(TableContext)!;

  return (
    <StyledHeader role='row' columns={columns}>
      {children}
    </StyledHeader>
  );
};

interface RowProps {
  children: ReactNode;
}

const Row: FC<RowProps> = ({ children }) => {
  const { columns } = useContext(TableContext)!;
  return (
    <StyledRow role='row' columns={columns}>
      {children}
    </StyledRow>
  );
};

interface BodyProps<T> {
  data: T[];
  error?: string;
  render: (item: T) => ReactNode;
}

function Body<T>({
  data,
  render,
  error = 'Brak produktów spełniających kryteria',
}: BodyProps<T>) {
  const { height } = useContext(TableContext)!;

  if (!data || data.length === 0)
    // Check if data is not defined or empty
    return <Empty>{error}</Empty>;

  return <StyledBody maxHeight={height}>{data.map(render)}</StyledBody>;
}
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
