import { styled } from 'styled-components';
import Heading from './Heading';
import { useEffect, useState } from 'react';
import Navigation from './Navigation';
import ProductCart from './ProductCart';
// import FadeInOut from './FadeInOut';
import ProductsButton from './ProductsButton';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const [showProducts, setShowProducts] = useState(false);
  const { pathname } = location;

  useEffect(() => {
    if (pathname !== '/search') setShowProducts(false);
  }, [location]);

  console.log(`location`, pathname);

  return (
    <Nav>
      <HeadingInfo as='h3'>
        {showProducts ? `Twoje produkty:` : `Menu:`}
      </HeadingInfo>
      {showProducts ? <ProductCart /> : <Navigation />}
      <ProductsButton
        showProducts={showProducts}
        onClick={() => setShowProducts((prev) => !prev)}
      />
    </Nav>
  );
}

export default SidebarContent;
