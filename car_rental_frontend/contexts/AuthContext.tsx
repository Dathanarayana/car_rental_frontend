
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    roles?: string[];
    role?: 'ADMIN' | 'USER';
}

interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    isAdmin: boolean;
    message: { text: string; type: 'success' | 'error' | 'info' } | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
    setMessage: (text: string | null, type?: 'success' | 'error' | 'info') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [message, setMessageState] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

    const isAdmin =
        user?.roles?.includes('ROLE_ADMIN') ||
        user?.role === 'ADMIN' ||
        user?.email?.includes('admin');

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('accessToken') || localStorage.getItem('token');
        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setAccessToken(savedToken);
        }
    }, []);

    const login = (userData: User, token: string) => {
        setUser(userData);
        setAccessToken(token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('accessToken', token);
        localStorage.setItem('token', token); // For admin API compatibility
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('token');
    };

    const setMessage = (text: string | null, type: 'success' | 'error' | 'info' = 'info') => {
        if (text === null) {
            setMessageState(null);
        } else {
            setMessageState({ text, type });
            // Auto-hide message after 5 seconds
            setTimeout(() => {
                setMessageState(null);
            }, 5000);
        }
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, isAdmin, message, login, logout, setMessage }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
