import { styled } from 'styled-components';
import Heading from './Heading';
import { useState } from 'react';
import Button from './Button';
import Menu from './Menu';
import ProductCart from './ProductCart';

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 2rem;
`;

const HeadingInfo = styled(Heading)`
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-grey-300);
`;

const NavBtn = styled(Button)`
  margin-top: auto;
`;

function SidebarContent() {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <Nav>
      <HeadingInfo as='h3'>
        {showProducts ? `Twoje produkty:` : `Menu:`}
      </HeadingInfo>
      {showProducts ? <ProductCart /> : <Menu />}
      <NavBtn size='large' onClick={() => setShowProducts((prev) => !prev)}>
        {showProducts ? 'Wróc do menu' : `Pokaż produkty (${0})`}
      </NavBtn>
    </Nav>
  );
}

export default SidebarContent;
