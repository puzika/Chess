import styled, { keyframes } from "styled-components";
import * as svar from '../../variables.style';

const rotate = keyframes`
   from {
      rotate: 0%;
   }

   to {
      rotate: 360deg;
   }
`

export const Loading = styled.div`
   height: 2.5rem;
   width: 2.5rem;
   border-radius: 50%;
   border-top: .2rem solid ${svar.clrNeutralMax};
   border-right: .2rem solid transparent;
   animation: ${rotate} 1s linear infinite;
`;