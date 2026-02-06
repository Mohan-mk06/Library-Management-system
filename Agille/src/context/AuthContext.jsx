import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('library_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Find user in mock data
        const foundUser = mockUsers.find(
            u => u.email === email && u.password === password
        );

        if (foundUser) {
            const userSession = {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role
            };
            setUser(userSession);
            localStorage.setItem('library_user', JSON.stringify(userSession));
            return { success: true, user: userSession };
        }

        return { success: false, error: 'Invalid email or password' };
    };

    const register = (name, email, password, role) => {
        // Check if user already exists
        const existingUser = mockUsers.find(u => u.email === email);
        if (existingUser) {
            return { success: false, error: 'User already exists with this email' };
        }

        // Create new user
        const newUser = {
            id: mockUsers.length + 1,
            name,
            email,
            password,
            role,
            active: true,
            joinedDate: new Date().toISOString().split('T')[0]
        };

        mockUsers.push(newUser);

        const userSession = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        };

        setUser(userSession);
        localStorage.setItem('library_user', JSON.stringify(userSession));
        return { success: true, user: userSession };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('library_user');
    };

    const updateProfile = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem('library_user', JSON.stringify(updatedUser));
        return { success: true };
    };

    const isAuthenticated = () => {
        return user !== null;
    };

    const isLibrarian = () => {
        return user?.role === 'librarian';
    };

    const value = {
        user,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated,
        isLibrarian,
        loading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
