import styled from "styled-components";
import * as svar from '../../variables.style';

type CellProps = {
   $color: string,
   $backgroundColor: string,
}

export const Board = styled.div`
   position: relative;
   width: 100%;
   display: grid;
   grid-template-columns: repeat(8, 1fr);
   border: 1rem solid ${svar.clrPrimary};
   margin: 0 1rem;
`;

export const Cell = styled.div<CellProps>`
   position: relative;
   aspect-ratio: 1;
   padding: .5rem;
   transition: box-shadow .15s;
   background-color: ${(props) => props.$backgroundColor};
   color: ${(props) => props.$color};
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