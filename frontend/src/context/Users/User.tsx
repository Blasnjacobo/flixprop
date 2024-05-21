import React, { useState, useEffect } from 'react';
import { User } from '../../types/User';
import userContext from './userContext';

interface UserProviderProps {
    children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps): JSX.Element {
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        const getTokenFromUrl = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            if (token) {
                // Token found in the URL, store it in local storage
                localStorage.setItem('jwtToken', token);

                // Remove token from current URL and navigate back to the original URL
                const currentUrl = new URL(window.location.href);
                currentUrl.searchParams.delete('token');
                window.location.href = currentUrl.origin + currentUrl.pathname;
            }
        };

        getTokenFromUrl();

        const getUser = async () => {
            try {
                const token = localStorage.getItem('jwtToken');

                // const response = await fetch('http://localhost:5000/auth/login/success', {
                const response = await fetch('https://flixprop-production.up.railway.app/auth/login/success', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    throw new Error('Authentication has failed!');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        getUser();
    }, []);

    return (
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    );
}
