import styled from "styled-components";
import * as svar from '../../variables.style';

export const MovesBarContainer = styled.div`
   width: 100%;
   flex: 1;
   background-color: ${svar.clrPrimary};
   padding: 1rem;
   border-radius: inherit;
   overflow: hidden;
`;

export const MovesBar = styled.div`
   height: 100%;
   border-radius: 1rem;
   overflow-y: scroll;

   &::-webkit-scrollbar {
      display: none;
   }
`;