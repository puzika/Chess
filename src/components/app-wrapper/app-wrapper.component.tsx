import { ReactNode } from 'react';
import * as S from './app-wrapper.style';

type AppWrapperProps = {
   children?: ReactNode,
}

export default function AppWrapper({ children }: AppWrapperProps) {
   return <S.AppWrapper>{ children }</S.AppWrapper>
}