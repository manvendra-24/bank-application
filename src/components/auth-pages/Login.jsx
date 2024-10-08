import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

import { loginService } from '../../services/AuthService';

import ToastNotification, { showToast } from '../../sharedComponents/ToastNotification';
import { InvalidCredentialError } from '../../utils/errors/Error';




const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await loginService(email, password);
      if (data.role === 'admin') {
        const token = data['accessToken'];
        localStorage.setItem("token", token);
        showToast('Logged in successfully!', 'success');
        navigate('/admin-dashboard');
      } 
      else if (data.role === 'customer') {
        const token = data['accessToken'];
        localStorage.setItem("token", token);
        showToast('Logged in successfully!', 'success');
        navigate('/customer-dashboard');
      }
    } catch(error){
      setError(error.specificMessage);
      showToast(error.specificMessage, 'error')
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Container className="w-100">
      <Row className="w-100 justify-content-center">
        <Col xs={10} sm={8} md={6} lg={4}>
          <Card className="p-4 shadow-lg">
            <Card.Body>
              <h3 className="text-center mb-4 text-primary">Login</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100">
                  Login
                </Button>
              </Form>
              <hr />
              <div className="text-center">
                <span>New User? </span>
                <Link to="/register-customer" className="text-decoration-none">
                  Register here
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Container>
      <ToastNotification />
    </Container>
  );
};

export default Login;
