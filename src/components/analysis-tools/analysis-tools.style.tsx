import { responsive } from "../../breakpoints";
import styled from "styled-components";

export const AnalysisSidebar = styled.div`
   position: absolute;
   top: 0;
   right: 0;
   translate: calc(100% + .5rem) 0;
   width: 60%;
   height: 100%;
   display: flex;
   flex-direction: column;
   gap: 1rem;
   border-radius: 1.5rem;
   overflow: hidden;

   ${responsive.lp`
      width: 50%;
   `}

   ${responsive.tbmin`
      position: static;
      translate: 0 0;
      width: 80%;
      height: 40rem;
   `}
`;