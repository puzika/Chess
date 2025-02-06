import { Link } from "react-router-dom";
import styled from "styled-components";
import * as svar from '../../variables.style';

export const VerticalNavigation = styled.ul`
   list-style: none;
`;

export const VerticalNavigationItem = styled.li`
   border-top: .1rem solid ${svar.clrNeutralMax};

   &:last-child {
      border-bottom: .1rem solid ${svar.clrNeutralMax};
   }
`

export const VerticalNavigationLink = styled(Link)`
   &:link,
   &:visited {
      color: inherit;
      text-decoration: none;
   }

   display: block;
   text-align: center;
   padding: 1.5rem;
   transition: background-color .2s;

   &:hover {
      background-color: ${svar.clrSecondary};
   }
`;