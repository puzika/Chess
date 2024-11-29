import styled, { css } from "styled-components";
import * as svar from '../../variables.style';

interface Props {
   isOpen: boolean,
}

const hideForm = css`
   visibility: hidden;
   opacity: 0;
`;

export const Overlay = styled.div<Props>`
   position: absolute;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   top: 0;
   bottom: 0;
   backdrop-filter: blur(1rem);
   z-index: 100;
   transition: all .5s;
   
   ${(props) => !props.isOpen && hideForm};
`;

export const Form = styled.form`
   position: relative;
   display: flex;
   flex-direction: column;
   align-items: center;
   background-color: ${svar.clrPrimary};
   gap: 2rem;
   padding: 2.5rem 5rem;
   border-radius: 2rem;
`;

export const FormTitle = styled.h3`
   font-size: 3.5rem;
   font-weight: bold;
`;

export const FormItem = styled.label`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 1rem;
   width: 100%;
`;

export const FormLabelMain = styled.p`
   font-size: 2.5rem;
`;

export const FormLabelSecondary = styled.p`
   font-size: 1.5rem;
`;

export const FormInputRange = styled.input`
   width: 100%;
   cursor: pointer;
`;