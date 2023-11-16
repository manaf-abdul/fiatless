import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const AuthLayout = ({ children }: any) => {
    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('access_token') !== null;

        if (!isAuthenticated && router.pathname !== '/login') {
            router.push('/login');
        } 
        // else {
        //     if(router.pathname==='/login') router.push('/')
        // }
    }, []);

    return children;
};

export default AuthLayout;