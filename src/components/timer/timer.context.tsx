import { createContext, ReactNode, useState } from "react";

export type TimerContextType = {
   isTimeOver: boolean,
   setIsTimerOver: (isTimerOver: boolean) => void,
};

const initialState: TimerContextType = {
   isTimeOver: false,
   setIsTimerOver: (isTimerOver: boolean): void => {}
};

export const TimerContext = createContext<TimerContextType>(initialState);

type TimerProviderProps = {
   children: ReactNode
}

export default function TimerProvider({ children }: TimerProviderProps) {
   const [isTimeOver, setIsTimerOver] = useState<boolean>(false);
   const value = { isTimeOver, setIsTimerOver };

   return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
}
