import styled from "styled-components";
import * as svar from '../../variables.style'

export const Sidebar = styled.aside`
   width: 35rem;
   height: 100%;
   background-color: ${svar.clrPrimary};
   padding: 4rem;
   transform-origin: left;
   transition: scale .5s;
`;

export const SideBarHeader = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   height: 5rem;
   font-size: 3rem;
   margin-bottom: 5rem;
`;

export const ExitButton = styled.button`
   height: 100%;
   background-color: inherit;
   padding: .5rem;
   border: none;
   outline: none;
   cursor: pointer;
`;

export const ExitIcon = styled.img`
   display: block;
   height: 100%;
`;