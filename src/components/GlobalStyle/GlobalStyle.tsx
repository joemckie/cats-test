import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { Font } from '../../config/typography';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

  ${normalize}

  * {
    box-sizing: border-box;
  }

  body {
    background-color: #ecf0f1;
    font-family: ${Font.Display};
  }
`;
