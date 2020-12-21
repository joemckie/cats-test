import React from 'react';
import styled from 'styled-components';
import { Size } from '../../config/layout';

interface FooterProps {
  className?: string;
}

const FooterInner = styled.div`
  margin: 0 auto;
  max-width: ${Size.ContainerWidth};
`;

const FooterComponent: React.FC<FooterProps> = ({
  className,
}) => (
  <footer className={className}>
    <FooterInner>Created by Joe McKie</FooterInner>
  </footer>
);

export const Footer = styled(FooterComponent)`
  align-self: center;
  background-color: #2c3e50;
  color: #ecf0f1;
  grid-area: footer;
  height: ${Size.FooterHeight};
  padding: 1rem;
`;
