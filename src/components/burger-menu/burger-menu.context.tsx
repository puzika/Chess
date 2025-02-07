import { useState, createContext, ReactNode } from "react";

type MenuContextType = {
   isOpen: boolean,
   setIsOpen: (isOpen: boolean) => void,
};

const initialState: MenuContextType = {
   isOpen: false,
   setIsOpen: (_isOpen: boolean) => {}
};

export const MenuContext = createContext<MenuContextType>(initialState);

type MenuProviderProps = {
   children?: ReactNode,
}

export default function MenuProvider({ children }: MenuProviderProps) {
   const [isOpen, setIsOpen] = useState<boolean>(false);

   const value = { isOpen, setIsOpen };

   return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}