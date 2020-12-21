import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { Font } from '../../config/typography';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    box-sizing: border-box;
  }

  body {
    background-color: #ecf0f1;
    font-family: ${Font.Display};
  }
`;
