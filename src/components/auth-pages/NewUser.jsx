import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { addCustomer, addAdmin } from '../../services/CustomerService';
import BackButton from '../../sharedComponents/BackButton';
import ToastNotification, { showToast } from '../../sharedComponents/ToastNotification';
import {
  required,
  isEmail,
  isAlpha,
  isAlphaNumNoSpace,
  checkSize,
  noSpace
} from '../../utils/helpers/Validation';

const Register = ({ role }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    newErrors.firstname = required(formData.firstname) || isAlpha(formData.firstname);
    newErrors.lastname = required(formData.lastname) || isAlpha(formData.lastname);
    newErrors.username = required(formData.username) || isAlphaNumNoSpace(formData.username);
    newErrors.email = required(formData.email) || isEmail(formData.email);
    newErrors.password = required(formData.password) || noSpace(formData.password)|| checkSize(formData.password, 8, 15);

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (role === 'customer') {
        await addCustomer(formData);
        showToast('Customer registered successfully!', 'success');
      } else if (role === 'admin') {
        await addAdmin(formData);
        showToast('Admin registered successfully!', 'success');
      } else {
        showToast('Error in registering user!', 'error');
        return;
      }

      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (err) {
      console.error('Registration failed:', err);
      showToast('Registration failed', 'error');
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

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
                        isInvalid={!!errors.firstname}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstname}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.lastname}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastname}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.username}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
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
      <ToastNotification />
    </Container>
  );
};

export default Register;
