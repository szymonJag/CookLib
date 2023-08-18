import { styled } from 'styled-components';
import Heading from './Heading';
import { useState } from 'react';
import Navigation from './Navigation';
import ProductCart from './ProductCart';
import FadeInOut from './FadeInOut';
import ProductsButton from './ProductsButton';

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

function SidebarContent() {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <Nav>
      <HeadingInfo as='h3'>
        {showProducts ? `Twoje produkty:` : `Menu:`}
      </HeadingInfo>
      <FadeInOut show={showProducts}>
        {showProducts ? <ProductCart /> : <Navigation />}
      </FadeInOut>
      <ProductsButton
        showProducts={showProducts}
        onClick={() => setShowProducts((prev) => !prev)}
      />
    </Nav>
  );
}

export default SidebarContent;
