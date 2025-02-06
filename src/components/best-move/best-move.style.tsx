import { responsive } from "../../breakpoints";
import styled from "styled-components";
import * as svar from '../../variables.style';

export const BestMove = styled.button`
   height: 5rem;
   display: flex;
   justify-content: center;
   align-items: center;
   color: inherit;
   font-size: 2.5rem;
   background-color: ${svar.clrPrimary};
   border: none;
   border-radius: inherit;
   outline: none;
   transition: background-color .2s;
   cursor: pointer;

   &:hover {
      background-color: ${svar.clrSecondary};
   }

   ${responsive.lp`
      font-size: 2rem;
   `}
`;