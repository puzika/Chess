import styled, { css } from "styled-components";

type Overlay = {
   $isOpen: boolean,
}

const hideForm = css`
   visibility: hidden;
   opacity: 0;
`;

export const Overlay = styled.div<Overlay>`
   position: fixed;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   top: 0;
   bottom: 0;
   backdrop-filter: blur(1rem);
   z-index: 100;
   transition: all .5s;
   
   ${(props) => !props.$isOpen && hideForm};
`;
