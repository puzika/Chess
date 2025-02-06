import styled from "styled-components";
import { responsive } from "../../breakpoints";

export const Container = styled.main`
   position: relative;
   margin: 5rem auto 0;
   width: 40%;
   min-width: 50rem;

   ${responsive.lp`
      min-width: 42rem;
   `};

   ${responsive.tbmin`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      width: 80%;
   `}
`