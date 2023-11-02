import { styled } from 'styled-components';
import Heading from './Heading';
// import { useEffect } from 'react';
import Navigation from './Navigation';
import ProductCart from '../features/search/components/IngredientCart';
// import FadeInOut from './FadeInOut';
import { useIngredientsContext } from '../contexts/IngredientsCartContext';
// import { useIngredientsContext } from '../contexts/IngredientsCartContext';

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  max-height: calc(100vh - 20rem);
  overflow-y: auto;
  overflow-x: hidden;
`;

const HeadingInfo = styled(Heading)`
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-grey-300);
`;

function SidebarContent() {
  const ingredientsContext = useIngredientsContext();
  const isCartVisible = ingredientsContext.isCartVisible;

  // useEffect(() => {
  //   if (pathname !== '/search') ingredientsContext.manageCartVisibility(false);
  // }, [location, ingredientsContext]);

  return (
    <>
      <HeadingInfo as='h3'>
        {isCartVisible ? `Twoje produkty:` : `Menu:`}
      </HeadingInfo>
      <Nav>{isCartVisible ? <ProductCart /> : <Navigation />}</Nav>
    </>
  );
}

export default SidebarContent;
