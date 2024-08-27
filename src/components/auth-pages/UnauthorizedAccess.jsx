import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="container mt-5 text-center">
            <h1 className="display-4">Unauthorized Access</h1>
            <p className="lead">You do not have permission to view this page.</p>
            <button className="btn btn-primary" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default Unauthorized;
