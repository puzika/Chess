import styled from "styled-components";
import * as svar from '../../variables.style';

export const BestMove = styled.button`
   color: inherit;
   font-size: 2.5rem;
   padding: 1rem 0;
   background-color: ${svar.clrPrimary};
   border: none;
   border-radius: inherit;
   transition: background-color .2s;
   cursor: pointer;

   &:hover {
      background-color: ${svar.clrSecondary};
   }
`;