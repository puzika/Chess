import styled from "styled-components";
import { Link } from "react-router-dom";

export const Navigation = styled.ul`
   list-style: none;
   display: flex;
   align-items: center;
   gap: 2rem;
`;

export const NavigationLink = styled(Link)`
   &:link,
   &:visited {
      color: inherit;
      text-decoration: none;
   }

   padding: 1rem;
`