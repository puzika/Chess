import { responsive } from "../../breakpoints";
import styled from "styled-components";
import * as svar from '../../variables.style';

type TimerProps = {
   $isTurn?: boolean,
}

export const Container = styled.div`
   position: absolute;
   top: 50%;
   right: 0;
   translate: calc(100% + 1rem) -50%;
   width: 50%;
   overflow: hidden;

   ${responsive.tbmin`
      position: static;
      translate: 0 0;
      width: 80%;
      text-align: center;
   `}

   ${responsive.mb`
      width: 90%;
   `}

   ${responsive.mbmin`
      width: 100%;
   `}
`;

export const TimerContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: .5rem;
   border-radius: 0 2rem 2rem 0;
   overflow: hidden;
   margin-bottom: 1rem;

   ${responsive.tbmin`
      flex-direction: row-reverse;
      border-radius: 2rem;
      margin-bottom: 2rem;
   `}
`;

export const Timer = styled.div<TimerProps>`
   flex: 1;
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

   ${responsive.lp`
      font-size: 3.5rem;
   `};
`;

export const PlayerName = styled.p`
   font-size: 1.8rem;
   white-space: nowrap;

   ${responsive.lp`
      font-size: 1.6rem;
   `}
`