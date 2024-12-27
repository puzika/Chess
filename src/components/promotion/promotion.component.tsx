import { useAppSelector } from '../../store/hooks';
import { selectTurn } from '../board/board.slice';
import type { Color } from '../board/board.slice';
import { pieces } from '../../pieces/pieces.images';
import * as S from './promotion.style';

export default function Promotion() {
   const turn: Color = useAppSelector(selectTurn);
   const promotionPieces: string[] = turn === 'w' ? ['Q', 'R', 'B', 'N'] : ['q', 'r', 'b', 'n'];
   
   return (
      <S.PromotionOverlay>
         <S.Promotion>
            {
               promotionPieces.map(piece => (
                  <S.PromotionPiece><S.PromotionPieceImg src={pieces[piece as keyof typeof pieces]} /></S.PromotionPiece>
               ))
            }
         </S.Promotion>
      </S.PromotionOverlay>
   )
}