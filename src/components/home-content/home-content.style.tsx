import { responsive } from "../../breakpoints";
import styled from "styled-components";

export const HomeContent = styled.div`
   flex: 1;
   align-self: center;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 4rem;
   width: 60%;

   ${responsive.mb`
      width: 80%;
   `}
`;

export const Description = styled.p`
   text-align: justify;
   font-size: 2.2rem;
`;

export const Links = styled.div`
   display: flex;
   gap: 2rem;
   align-items: center;
`;