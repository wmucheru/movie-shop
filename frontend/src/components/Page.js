import { useEffect } from 'react';

import Navbar from './Navbar';

import { isLoggedIn } from '../utils/auth';

export const Page = ({ children, title='Movie Shop' }) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <div className="clearfix">
            { isLoggedIn() ? <Navbar /> : null }
            { children }
        </div>
    );
}