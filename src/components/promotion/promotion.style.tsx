import styled from "styled-components";
import * as svar from '../../variables.style';

export const PromotionOverlay = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: ${svar.clrPromotionOverlay};
`;

export const Promotion = styled.div`
   position: absolute;
   top: 50%;
   left: 50%;
   translate: -50% -50%;
   width: 75%;
   display: flex;
   border-radius: 1rem;
   overflow: hidden;
`;

export const PromotionPiece = styled.div`
   position: relative;
   flex: 1;
   aspect-ratio: 1;
   background-color: ${svar.clrTertiary};

   &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      translate: -50% 0;
      height: .5rem;
      width: 0;
      background-color: ${svar.clrHighlight};
      transition: width .2s;
   }

   &:hover::after {
      width: 100%;
   }
`;

export const PromotionPieceImg = styled.img`
   display: block;
   width: 100%;
   cursor: pointer;
`;