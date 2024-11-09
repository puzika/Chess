import styled from "styled-components";
import * as svar from '../../variables.style';

export const Board = styled.div`
   /* flex: 1; */
   margin: 5rem auto 0;
   max-width: 60rem;
   display: grid;
   grid-template-columns: repeat(8, 1fr);
   border: 1rem solid ${svar.clrPrimary};
`;

export const Cell = styled.div`
   aspect-ratio: 1;
`