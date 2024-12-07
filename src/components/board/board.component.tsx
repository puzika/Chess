import { useAppSelector } from '../../store/hooks';
import { selectPlayer } from '../game/game.slice';
import { RANKS, FILES, selectPosition, selectTurn } from './board.slice';
import { getCellColor } from './board.utils';
import { generateBoardFromFen } from './board.utils';
import { pieces } from '../../pieces/pieces.images';
import { getLegalMoves } from '../../pieces/pieces.moves';
import type { Color } from './board.slice';
import type { Coords } from './board.slice';
import * as S from './board.style';
import * as svar from '../../variables.style';

export default function Board() {
   const player: Color = useAppSelector(selectPlayer);
   const turn: Color = useAppSelector(selectTurn);
   const position: string = useAppSelector(selectPosition);

   const ranks: string[] = player === 'w' ? [...RANKS].reverse() : RANKS;
   const files: string[] = player === 'w' ? FILES : [...FILES].reverse();
   const board: string[][] = player === 'w' ? generateBoardFromFen(position) : generateBoardFromFen(position.split('').reverse().join(''));
   const legalMoves: Map<number, Coords[]> = getLegalMoves(board, turn, player);

   return (
      <S.Board>
         {
            ranks.map((rank, idxRank) => (
               files.map((file, idxFile) => (
                  <S.Cell 
                     key={file + rank} 
                     $backgroundColor={getCellColor(idxRank, idxFile) === 'w' ? svar.clrCellWhite : svar.clrCellBlack} 
                     $color={getCellColor(idxRank, idxFile) === 'w' ? svar.clrCellBlack : svar.clrCellWhite}
                  >
                     { idxRank === ranks.length - 1 && <S.FileMark>{file}</S.FileMark> }
                     { idxFile === files.length - 1 && <S.RankMark>{rank}</S.RankMark> }
                     {!!board[idxRank][idxFile] && <S.Piece src={pieces[board[idxRank][idxFile]]} /> }
                  </S.Cell>
               ))
            ))
         }
      </S.Board>
   )
}