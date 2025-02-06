import { useEffect, useState, createContext, ReactNode } from "react";

type ScreenSize = {
   screenSize: number,
}

const initialState: ScreenSize = {
   screenSize: window.innerWidth,
}

export const ScreenSizeContext = createContext<ScreenSize>(initialState);

type ScreenSizeProps = {
   children?: ReactNode,
}

export default function ScreenSizeProvider({ children }: ScreenSizeProps) {
   const [screenSize, setScreenSize] = useState<number>(window.innerWidth);
   const value = { screenSize };

   useEffect(() => {
      const handleScreenSizeChange = (): void => {
         const currSize: number = window.innerWidth;

         if (Math.abs(currSize - screenSize) >= 10) setScreenSize(currSize);
      }

      window.addEventListener('resize', handleScreenSizeChange);

      return () => window.removeEventListener('resize', handleScreenSizeChange);
   }, []);

   return <ScreenSizeContext.Provider value={value}>{ children }</ScreenSizeContext.Provider>
} 