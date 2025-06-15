import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function GlobalContext({ children }) {
    const [showAuth, setShowAuth] = useState(false);

    return(
        <ModalContext.Provider value={{showAuth, setShowAuth}}>
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    return useContext(ModalContext);
}