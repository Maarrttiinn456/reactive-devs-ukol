import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';
import { isUserAuthorized, login, regsiter } from '../api/authApi';
import type { NewUser } from '../types/global';

type AuthContextType = {
    status: 'loading' | 'authenticated' | 'unauthenticated';
    loginUser: (data: NewUser) => Promise<void>;
    registerUser: (data: NewUser) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [status, setStatus] = useState<AuthContextType['status']>('loading');

    useEffect(() => {
        const checkIfUserIsLogin = async () => {
            try {
                const res = await isUserAuthorized();
                if (!res.ok) {
                    setStatus('unauthenticated');
                    return;
                }
                setStatus('authenticated');
            } catch {
                setStatus('unauthenticated');
            }
        };

        checkIfUserIsLogin();
    }, []);

    const registerUser = async (user: NewUser) => {
        /*
        setStatus('loadidng');  

        if (!res.ok) {
            setStatus("unauthenticated");
            throw new Error("Nepodařilo se registrovat");
        }
        */
    };

    const loginUser = async (user: NewUser) => {
        /*
        setStatus('loading');

        const res = await login(user);

        if (!res.ok) {
            setStatus("unauthenticated");
            throw new Error("Nepodařilo se přihlásit");
        }
        */

        setStatus('authenticated');
    };

    return (
        <AuthContext.Provider value={{ status, loginUser, registerUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);

    if (!ctx) throw new Error('Nepodaařilo se načist provider');

    return ctx;
};

export default AuthContextProvider;
