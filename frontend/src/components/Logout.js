import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { logOut } from '../utils/auth';

export default function Logout() {
    let navigate = useNavigate();

    useEffect(() => {
        logOut();
        navigate('/');
    });

    return <></>;
}