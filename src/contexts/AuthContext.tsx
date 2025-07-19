import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AuthResponse, getAuth } from '../services/Rest';


const LOCAL_STORAGE_KEY = 'show-logout-window';


type NullableBoolean = boolean | null;
type AuthType = [NullableBoolean, React.Dispatch<React.SetStateAction<NullableBoolean>>]
type StateContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];


interface AuthContextType {
    userData: AuthResponse | null;
    authorized: NullableBoolean;
    logoutWindow: AuthType;
}

const AuthContext = createContext<AuthContextType>({
    userData: null,
    authorized: null,
    logoutWindow: [false, () => {}]
});
export const useAuth = (): AuthContextType => useContext(AuthContext);

const AuthVisibleContext = createContext<StateContextType | undefined>(undefined);
export const useVisibleAuth = (): StateContextType => {
    const context = useContext(AuthVisibleContext);
    if (!context) {
        throw new Error('useVisible must be used within <AuthProvider>');
    }
    return context;
}


export function AuthProvider({children}: {children: React.ReactNode}) {
    const [authUserData, setAuthUserData] = useState<AuthResponse | null>(null);
    const [authorized, setAuthorized] = useState<NullableBoolean>(null);
    const [showLogout, setShowLogout] = useState<NullableBoolean>(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        return stored == null ? null : false;
    });

    const visibleAuthState = useState(false);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, String(showLogout));
    }, [showLogout])

    const initialized = useRef(false);
    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        getAuth()
            .then(response => {
                setAuthUserData(response);
                setAuthorized(true);
                console.log("Authentication successfully passed welcome ", response.username);
            })
            .catch(error => {
                setAuthorized(false);
                console.error("Response error from /get-auth: ", error);
            }) 
    }, [])

    return(
        <AuthContext.Provider value={{userData: authUserData, authorized, logoutWindow: [showLogout, setShowLogout]}}>
            <AuthVisibleContext.Provider value={visibleAuthState}>
                {children}
            </AuthVisibleContext.Provider>
        </AuthContext.Provider>
    )

}
