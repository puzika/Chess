import styled from "styled-components";
import * as svar from '../../variables.style';

type TimerProps = {
   $isTurn?: boolean,
}

export const Container = styled.div`
   position: absolute;
   top: 50%;
   right: 0;
   translate: 100% -50%;
   width: 50%;
   overflow: hidden;
`;

export const TimerContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: .5rem;
   border-radius: 0 2rem 2rem 0;
   overflow: hidden;
   margin-bottom: 1rem;
`;

export const Timer = styled.div<TimerProps>`
   display: flex;
   align-items: center;
   gap: 2rem;
   background-color: ${svar.clrPrimary};
   color: ${({$isTurn}) => $isTurn ? svar.clrHighlight : 'inherit'};
   padding: 2rem;
   box-shadow: ${({$isTurn}) => $isTurn ? `inset 0 0 2rem ${svar.clrHighlight}` : 'none'};
`;

export const TimerData = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 1rem;
`;

export const Time = styled.p`
   font-size: 4rem;
`;

export const PlayerName = styled.p`
   font-size: 1.8rem;
`