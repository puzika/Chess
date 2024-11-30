import styled from "styled-components";
import * as svar from '../../variables.style';

export const ExitButton = styled.button`
   position: absolute;
   top: 0;
   right: 0;
   translate: 50% -50%;
   background-color: ${svar.clrPrimary};
   width: 4rem;
   height: 4rem;
   border: .1rem solid ${svar.clrTertiary};
   border-radius: 50%;
   cursor: pointer;

   &::before,
   &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      width: 50%;
      height: .2rem;
      background-color: ${svar.clrNeutralMax};
   }

   &::before {
      rotate: 45deg;
   }

   &::after {
      rotate: -45deg;
   }
`