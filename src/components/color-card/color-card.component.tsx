import * as S from './color-card.style';
import * as svar from '../../variables.style';

export type CardColor = 'black' | 'white' | 'random';

export type CardProps = {
   width: string,
   color: CardColor,
   chosen?: boolean,
   clickHandler?: () => void,
}

export default function ColorCard({color, width, chosen, clickHandler}: CardProps) {
   return <S.Card onClick={clickHandler} style={{borderColor: chosen ? svar.clrHighlight : svar.clrTertiary}} width={width} color={color} />
}