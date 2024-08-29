import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

import ToastNotification, { showToast } from '../../sharedComponents/ToastNotification';

const Header = ({role}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        showToast('Logged out successfully!', 'success');
        setTimeout(() => {
          localStorage.removeItem('token');
          navigate('/login');
        }, 500);
      };
    const linkStyle = {
        color: 'black',
        padding: '0.5rem 1rem',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        textDecoration: 'none',
    };

    const linkHoverStyle = {
        color: 'blue'
    };

    return (
        <Navbar 
            expand="lg" 
            style={{ 
                marginBottom: '0', 
                marginLeft: '0', 
                marginRight: '0'
            }} 
            className="w-100"
        >
            {role === "admin" && <Navbar.Brand href="/admin-dashboard" className="fw-bold text-primary">
                BankApp.
            </Navbar.Brand>}
            {role === "customer" && <Navbar.Brand href="/customer-dashboard" className="fw-bold text-primary">
                BankApp.
            </Navbar.Brand>}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="align-items-center">
                    <Nav.Link 
                        href="/profile" 
                        style={linkStyle}
                        onMouseOver={(e) => {
                            e.target.closest('.nav-link').style.color = linkHoverStyle.color;
                        }}
                        onMouseOut={(e) => {
                            e.target.closest('.nav-link').style.color = linkStyle.color;
                        }}
                    >
                        <FaUserCircle /> Profile
                    </Nav.Link>
                    
                    <Nav.Link 
                        onClick={handleLogout} 
                        style={linkStyle}
                        onMouseOver={(e) => {
                            e.target.closest('.nav-link').style.color = linkHoverStyle.color;
                        }}
                        onMouseOut={(e) => {
                            e.target.closest('.nav-link').style.color = linkStyle.color;
                        }}
                    >
                        <FaSignOutAlt /> Logout
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <ToastNotification />
        </Navbar>
    );
}

export default Header;
