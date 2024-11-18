import React, { createContext, useState } from 'react';
import authService from '../services/authService.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        const loggedInUser = await authService.login(email, password);
        setUser(loggedInUser);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        `<AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>`
    );
};
