import styled from "styled-components";
import * as svar from '../../variables.style';

export const Board = styled.div`
   width: 40%;
   display: grid;
   grid-template-columns: repeat(8, 1fr);
   border: 1rem solid ${svar.clrPrimary};
`;

export const Cell = styled.div`
   position: relative;
   aspect-ratio: 1;
   padding: .5rem;
`;

export const RankMark = styled.span`
   position: absolute;
   top: .5rem;
   right: .5rem;
`;

export const FileMark = styled.span`
   position: absolute;
   bottom: .5rem;
   left: .5rem;
`;

export const Piece = styled.img`
   display: block;
   width: 100%;
   cursor: pointer;
`