import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface IAuthRoutepagepros {
    children: any;
}

function AuthRoute(props: IAuthRoutepagepros) {
    const { children } = props;
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setloading] = useState(true);

    const AuthCheck = useCallback(
        () =>
            onAuthStateChanged(auth, user => {
                if (user) {
                    setloading(false);
                } else {
                    navigate('/home');
                }
            }),
        [auth, navigate],
    );

    useEffect(() => {
        AuthCheck();
    }, [AuthCheck]);

    if (loading) return <p>loading...</p>;

    return <div> {children} </div>;
}
export default AuthRoute;