import styled, { css } from "styled-components";
import type { CardProps } from "./color-card.component";
import * as svar from '../../variables.style';

type CardStyleProps = Omit<CardProps, 'clickHandler'>;

const backgroundRandom = css`
   background-image: linear-gradient(90deg, ${svar.clrNeutralMax} 0% 50%, ${svar.clrNeutralMin} 50% 100%);
`;

export const Card = styled.div<CardStyleProps>`
   position: relative;
   width: ${({width}) => width}rem;
   aspect-ratio: 1;
   border-width: .5rem;
   border-style: solid;
   border-radius: 1rem;
   ${({color}) => color === 'random' ? 
      backgroundRandom :
      css`background-color: ${color}`
   };
   transition: border-color .2s;
   cursor: pointer;
`