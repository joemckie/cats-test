import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Size } from '../../config/layout';
import { Routes } from '../../config/routes';

interface HeaderProps {
  className?: string;
}

const HeaderInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  margin: 0 auto;
  max-width: ${Size.ContainerWidth};
  justify-content: space-between;
`;

const HeaderLink = styled(Link)`
  color: #ecf0f1;
  text-decoration: none;
  padding: 1rem;
  margin: -1rem;
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
  background-color: #2c3e50;
  color: #ecf0f1;
  display: flex;
  grid-area: header;
  height: ${Size.HeaderHeight};
  padding: 0 ${Size.GutterWidth};
`;
