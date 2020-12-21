import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Size } from '../../config/layout';
import { Routes } from '../../config/routes';

interface HeaderProps {
  className?: string;
}

const HeaderInner = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: ${Size.ContainerWidth};
  justify-content: space-between;
`;

const HeaderLink = styled(Link)`
  color: #ecf0f1;
  text-decoration: none;
`;

const HeaderComponent: React.FC<HeaderProps> = ({
  className,
}) => (
  <header className={className}>
    <HeaderInner>
      <HeaderLink to={Routes.Home}>Home</HeaderLink>
      <HeaderLink to={Routes.Upload}>Upload</HeaderLink>
    </HeaderInner>
  </header>
);

export const Header = styled(HeaderComponent)`
  align-self: center;
  background-color: #2c3e50;
  color: #ecf0f1;
  grid-area: header;
  height: ${Size.HeaderHeight};
  padding: 1rem;
`;
