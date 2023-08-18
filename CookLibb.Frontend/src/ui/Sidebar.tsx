import { styled } from 'styled-components';
import logoImg from '../assets/images/image-removebg-preview.png';
import Heading from './Heading';
import SidebarContent from './SidebarContent';

const SidebarLayout = styled.aside`
  padding: 2rem;
  background-color: var(--color-grey-200);

  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 10rem;
  gap: 2rem;
`;

const LogoImg = styled.img`
  height: 7rem;
  width: auto;
`;

const TitleText = styled.h1`
  font-weight: 300;
`;

function Logo() {
  return <LogoImg src={logoImg} />;
}

function Title() {
  return (
    <Heading>
      <TitleText as='h1'>CookLib</TitleText>
    </Heading>
  );
}

function Sidebar() {
  return (
    <SidebarLayout>
      <Header>
        <Logo />
        <Title />
      </Header>
      <SidebarContent />
    </SidebarLayout>
  );
}

export default Sidebar;
