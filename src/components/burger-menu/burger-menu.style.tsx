import styled from "styled-components";
import * as svar from '../../variables.style';

export const BurgerMenuIcon = styled.span`
   position: relative;
   width: 3.5rem;
   height: .5rem;
   background-color: ${svar.clrNeutralMax};
   transition: background-color .2s;
   margin-right: 2rem;

   &::before,
   &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: inherit;
      background-color: ${svar.clrNeutralMax};
      transition: all .5s;
   }

   &::before {
      translate: 0 -200%;
   }

   &::after {
      translate: 0 200%;
   }

   &.open {
      background-color: transparent;
   }

   &.open::before {
      translate: 0;
      rotate: 135deg;
   }

   &.open::after {
      translate: 0;
      rotate: -135deg;
   }
`;