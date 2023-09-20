import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';
import { MdAddCircleOutline, MdAdminPanelSettings } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { motion } from 'framer-motion';

const List = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const Element = styled.li``;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-grey-700);
  }
`;

function Navigation() {
  return (
    <List initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <Element>
        <StyledNavLink to='/recipes'>
          <GiNotebook />
          Przepisy
        </StyledNavLink>
      </Element>
      <Element>
        <StyledNavLink to='/search'>
          <FaSearch />
          Szukaj przepisów
        </StyledNavLink>
      </Element>

      <Element>
        <StyledNavLink to='/add-recipe'>
          <MdAddCircleOutline />
          Dodaj przepis
        </StyledNavLink>
      </Element>
      <Element>
        <StyledNavLink to='/user'>
          <FiUsers />
          Panel użytkownika
        </StyledNavLink>
      </Element>
      <Element>
        <StyledNavLink to='/admin'>
          <MdAdminPanelSettings />
          Panel administratora
        </StyledNavLink>
      </Element>
    </List>
  );
}

export default Navigation;
