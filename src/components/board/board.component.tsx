import { RANKS, FILES } from './board.slice';
import { getCellColor } from './board.utils';
import * as S from './board.style';
import * as svar from '../../variables.style';

export default function Board() {


   return (
      <S.Board>
         {
            RANKS.map((rank, idxRank) => (
               FILES.map((file, idxFile) => (
                  <S.Cell 
                     key={rank + file} 
                     $backgroundColor={getCellColor(idxRank, idxFile) === 'w' ? svar.clrCellWhite : svar.clrCellBlack} 
                     $color={getCellColor(idxRank, idxFile) === 'w' ? svar.clrCellBlack : svar.clrCellWhite}>

                  </S.Cell>
               ))
            ))
         }
      </S.Board>
   )
}