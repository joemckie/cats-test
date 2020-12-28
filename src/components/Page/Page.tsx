import React from 'react';
import styled from 'styled-components';
import { Size } from '../../config/layout';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

interface PageProps {
  className?: string;
}

const PageInner = styled.div`
  margin: 1rem 0;
  grid-area: main;
`;

const PageComponent: React.FC<PageProps> = ({ children, className }) => (
  <main className={className}>
    <Header />
    <PageInner>{children}</PageInner>
    <Footer />
  </main>
);

export const Page = styled(PageComponent)`
  display: grid;
  grid-template:
    'header header header'
    '. main .'
    'footer footer footer';
  grid-template-rows: ${Size.HeaderHeight} 1fr ${Size.FooterHeight};
  grid-template-columns:
    minmax(${Size.GutterWidth}, auto)
    minmax(auto, ${Size.ContainerWidth})
    minmax(${Size.GutterWidth}, auto);
  min-height: 100vh;
`;
