import { styled } from 'styled-components';
import { TbFridge } from 'react-icons/tb';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Button from './Button';
import { useIngredientsContext } from '../contexts/IngredientsCartContext';

const NavBtn = styled(Button)`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: all 0.2s;

  &:hover {
    transform: scale(99%);
  }

  &:active {
    transform: scale(100%);
  }
`;

interface ProductsButtonProps {
  showProducts: boolean;
  onClick: () => void;
}

function ProductsButton({ showProducts, onClick }: ProductsButtonProps) {
  const ingredientsContext = useIngredientsContext();
  const ingredientsLength = ingredientsContext.ingredients.length;

  return (
    <>
      <NavBtn size='large' onClick={onClick}>
        {showProducts ? (
          <>
            <AiOutlineArrowLeft />
            Wróc do menu
          </>
        ) : (
          <>
            <TbFridge /> Wybrane produkty ({ingredientsLength})
          </>
        )}
      </NavBtn>
    </>
  );
}

export default ProductsButton;
