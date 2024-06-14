import React from "react";
import menuStore from "./MenuStore"

// React Context 생성
export const MenuContext = React.createContext(menuStore);

// Context Provider 컴포넌트 생성 
export const MenuProvider = ({children}) =>{
    return (
        <MenuContext.Provider value={menuStore}>
            {children}
        </MenuContext.Provider>
    )
}