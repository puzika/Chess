import styled from "styled-components";
import * as svar from '../../variables.style';

export const Popup = styled.div`
   position: absolute;
   top: 50%;
   left: 50%;
   translate: -50% -50%;
   width: 30%;
   min-width: 40rem;
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 2.5rem;
   padding: 2.5rem;
   border-radius: 2rem;
   background-color: ${svar.clrPrimary};
`;

export const PopupMessage = styled.p`
   font-size: 3.5rem;
`;

export const Buttons = styled.div`
   display: flex;
   gap: 2rem;
`