import styled from "styled-components";
import type { Color } from "../board/board.slice";
import * as svar from '../../variables.style';

type MoveStyleProps = {
   turn: Color,
}

export const Move = styled.div<MoveStyleProps>`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 5rem;
   color: ${svar.clrNeutralMax};
   background-color: ${({turn}) => turn === 'w' ? svar.clrCellWhite : svar.clrCellBlack };
   transition: all .2s;
   cursor: pointer;

   &:first-child {
      border-radius: 1rem 1rem 0 0;
   }

   &:hover {
      opacity: .6;
   }
`;