import * as S from './board.style';
import * as svar from '../../variables.style';

const files: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const ranks: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'].reverse();

export default function Board() {
   return (
      <S.Board>
         {
            ranks.map((rank, idxRank) => (
               files.map((file, idxFile) => (
                  <S.Cell style={{backgroundColor: (idxRank % 2 === 0 && idxFile % 2 !== 0) || (idxRank % 2 !== 0 && idxFile % 2 === 0) ? `${svar.clrCellWhite}` : `${svar.clrCellBlack}`}} key={idxRank * 8 + idxFile}>{idxFile === 0 && rank}{idxRank === 7 && file}</S.Cell>
               ))
            ))
         }
      </S.Board>
   )
}