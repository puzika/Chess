import styled from "styled-components";
import * as svar from '../../variables.style';

export const BurgerMenuContainer = styled.div`
   position: relative;
   width: 3rem;
   aspect-ratio: 1;
   display: flex;
   align-items: center;
   margin-right: 2rem;
   cursor: pointer;

   &:active span::before {
      translate: 0 50%;
   }

   &:active span::after {
      translate: 0 -50%;
   }
`;

export const BurgerMenuIcon = styled.span`
   width: 100%;
   height: .5rem;
   background-color: ${svar.clrNeutralMax};
   transition: background-color .2s;

   &::before,
   &::after {
      content: '';
      position: absolute;
      width: inherit;
      height: inherit;
      background-color: ${svar.clrNeutralMax};
      transition: all .2s;
   }

   &::before {
      top: 0;
   }

   &::after {
      bottom: 0;
   }
`