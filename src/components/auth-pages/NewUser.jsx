import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { addCustomer, addAdmin } from '../../services/CustomerService';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../sharedComponents/BackButton';
import { Toast } from 'react-bootstrap';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const Register = ({ role }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (role === 'customer') {
        await addCustomer(formData);
        setSuccess('Customer registered successfully!');
      } else if (role === 'admin') {
        await addAdmin(formData);
        setSuccess('Admin registered successfully!');
      } else {
        setError('Invalid role specified.');
        return;
      }
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate(-1);
      }, 2000);
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration failed. Please try again.');
    }
  };

  
  if (error) {
    return (
      <Container fluid className="bg-light text-dark d-flex flex-column min-vh-100">
        <Header />
        <div className="flex-grow-1">
          <Container className="mt-5">
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          </Container>
        </div>
        <Footer />
      </Container>
    );
  }

  return (
    <Container fluid className="bg-light text-dark d-flex flex-column min-vh-100">
      <div className="content-container flex-grow-1 d-flex justify-content-center align-items-center">
        <Container className="mt-5 d-flex justify-content-center align-items-center" style={{ maxWidth: '600px' }}>
          <Card className="w-100">
            <Card.Header as="h4" className="text-center">Register</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="firstname">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="lastname">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="d-flex justify-content-between">
                  <Col md={5}>
                    <Button variant="primary" type="submit">
                      Register
                    </Button>
                  </Col>
                  <Col md="auto">
                    <BackButton />
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={2000}
        autohide
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
      >
        <Toast.Body>{success}</Toast.Body>
      </Toast>
    </Container>
  );
};

export default Register;
