import { useAppSelector } from '../../store/hooks';
import { selectTurn } from '../board/board.slice';
import type { Color } from '../board/board.slice';
import { pieces } from '../../pieces/pieces.images';
import * as S from './promotion.style';

type PromotionProps = {
   promotionHandler: (piece: string) => void,
}

export default function Promotion({ promotionHandler }: PromotionProps) {
   const turn: Color = useAppSelector(selectTurn);
   const promotionPieces: string[] = turn === 'w' ? ['q', 'r', 'b', 'n'] : ['Q', 'R', 'B', 'N'];
   
   return (
      <S.PromotionOverlay>
         <S.Promotion>
            {
               promotionPieces.map(piece => (
                  <S.PromotionPiece key={piece} onClick={() => promotionHandler(piece)} >
                     <S.PromotionPieceImg src={pieces[piece]} />
                  </S.PromotionPiece>
               ))
            }
         </S.Promotion>
      </S.PromotionOverlay>
   )
}