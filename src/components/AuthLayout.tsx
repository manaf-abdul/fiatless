import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import ModalStore from '@/store/ModalStore';
import { useSnapshot } from 'valtio';
import SettingsStore from '@/store/SettingsStore';

const AuthLayout = ({ children }: any) => {

    const { isAuth } = useSnapshot(SettingsStore.state)
    const router = useRouter();

    useEffect(() => {
        // const isPinSet = window.localStorage.getItem('PIN');
        // console.log({ isPinSet })

        // if (!isPinSet) {
        //     router.push('/signup');
        // }
        // if (!isAuth) {
        //     router.push("/signup")
        // }
    }, []);

    return children;
};

export default AuthLayout;