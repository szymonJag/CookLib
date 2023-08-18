import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { TbFridge } from 'react-icons/tb';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Button from './Button';

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
  const location = useLocation();
  const isButtonShow = location.pathname === '/search';

  return (
    <>
      {isButtonShow && (
        <NavBtn size='large' onClick={onClick}>
          {showProducts ? (
            <>
              <AiOutlineArrowLeft />
              Wróc do menu
            </>
          ) : (
            <>
              <TbFridge /> Wybrane produkty ({0})
            </>
          )}
        </NavBtn>
      )}
    </>
  );
}

export default ProductsButton;
