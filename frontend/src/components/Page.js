import { useEffect } from 'react';

import Navbar from './Navbar';

import { isLoggedIn } from '../utils/auth';

export default function Page({ children, title = 'Movie Shop', bodyClass='' }) {
    useEffect(() => {
        document.title = title;
        document.getElementsByTagName('body')[0].classList = [bodyClass];
    }, []);

    return (
        <div className="clearfix">
            {isLoggedIn() ? <Navbar /> : null}

            <div className="page-header">
                <div className="container">
                    <h1>{title}</h1>
                </div>
            </div>

            <div className="container page-content">
                { children }
            </div>
        </div>
    );
}