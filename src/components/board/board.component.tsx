import * as S from './board.style';
import * as svar from '../../variables.style';

const files: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const ranks: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'].reverse();

const isBlack = (idxRank: number, idxFile: number): boolean => {
   return (idxRank % 2 === 0 && idxFile % 2 !== 0) || (idxRank % 2 !== 0 && idxFile % 2 === 0);
}

export default function Board() {
   return (
      <S.Board>
         {
            ranks.map((rank, idxRank) => (
               files.map((file, idxFile) => (
                  <S.Cell 
                     style={{
                        backgroundColor: isBlack(idxRank, idxFile) ? 
                           `${svar.clrCellBlack}` : 
                           `${svar.clrCellWhite}`,
                        color: isBlack(idxRank, idxFile) ? 
                           `${svar.clrCellWhite}` :
                           `${svar.clrCellBlack}`,
                     }} 
                     key={idxRank * 8 + idxFile}
                  >
                     <S.RankMark>{idxFile === 7 && rank}</S.RankMark>
                     <S.FileMark>{idxRank === 7 && file}</S.FileMark>
                  </S.Cell>
               ))
            ))
         }
      </S.Board>
   )
}