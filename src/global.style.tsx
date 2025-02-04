import { createGlobalStyle } from "styled-components";
import { responsive } from "./breakpoints";
import * as svar from './variables.style';

export const GlobalStyles = createGlobalStyle`
   *,
   *::before,
   *::after {
      padding: 0;
      margin: 0;
      box-sizing: inherit;
   }

   html {
      font-size: 62.5%;
      box-sizing: border-box;

      ${responsive.tb`
         font-size: 50%;
      `}

      ${responsive.tbmin`
         font-size: 45%
      `}
   }

   body {
      font-size: 2rem;
      font-family: Arial, Helvetica, sans-serif;
      color: ${svar.clrNeutralMax};
      background-color: ${svar.clrBase};
   }
`