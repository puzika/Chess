import styled from "styled-components";
import * as svar from '../../variables.style';

export const Header = styled.header`
   flex-shrink: 0;
   display: flex;
   align-items: center;
   width: 100%;
   height: 10rem;
   background-color: ${svar.clrPrimary};
   padding: 0 5rem;
`;

export const HeaderTitle = styled.h1`
   font-size: 4rem;
   margin-right: auto;
`