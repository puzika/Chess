import styled from "styled-components";
import * as svar from '../../variables.style';
import { responsive } from "../../breakpoints";

export const Jumps = styled.div`
   display: flex;
   gap: .2rem;
   width: 100%;
   height: 8rem;
   border-radius: inherit;
   overflow: hidden;

   ${responsive.lp`
      height: 6rem;
   `}
`;

export const Jump = styled.button`
   flex: 1;
   background-color: ${svar.clrPrimary};
   padding: 1rem;
   text-align: center;
   border: none;
   outline: none;
   transition: background-color .2s;
   cursor: pointer;

   &:hover {
      background-color: ${svar.clrSecondary};
   }
`;

export const JumpImg = styled.img`
   height: 100%;
`;