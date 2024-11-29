import styled from "styled-components";
import * as svar from '../../variables.style';

export const Button = styled.button`
   background-color: ${svar.clrSecondary};
   color: inherit;
   font-size: inherit;
   padding: 1rem 3rem;
   border: none;
   border-radius: 10rem;
   transition: background-color .2s;
   cursor: pointer;

   &:hover {
      background-color: ${svar.clrTertiary};
   }
`