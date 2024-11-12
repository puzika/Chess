import styled from "styled-components";
import * as svar from '../../variables.style';

export const HeaderWrapper = styled.header`
   height: 10rem;
`

export const Header = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   display: flex;
   align-items: center;
   height: inherit;
   background-color: ${svar.clrPrimary};
   padding: 0 5rem;
   z-index: 10;
`;

export const HeaderTitle = styled.h1`
   font-size: 4rem;
   margin-right: auto;
`