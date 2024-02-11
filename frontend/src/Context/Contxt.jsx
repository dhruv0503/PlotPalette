import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

function MyContextProvider({ children }) {
    return (
        <MyContext.Provider>
            {children}
        </MyContext.Provider>
    )
    
}


export function useApi() {
    return useContext(MyContext);
}