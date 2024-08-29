import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Header from '../layout/Header';
import Footer from '../layout/Footer';
import BackButton from '../../sharedComponents/BackButton';
import { getUser, setUser } from '../../services/AuthService';

import ToastNotification, { showToast } from '../../sharedComponents/ToastNotification';
import { required, isEmail, isAlpha, isAlphaNumNoSpace, checkSize } from '../../utils/helpers/Validation';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUser();
        setProfile(userData);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        showToast('Failed to load user profile', 'error');
        setTimeout(() => {
          navigate(-1);
        }, 500);
      }
    };

    fetchUserProfile();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    newErrors.firstname = required(profile.firstname) || isAlpha(profile.firstname) || checkSize(profile.firstname, 1, 10);
    newErrors.lastname = required(profile.lastname) || isAlpha(profile.lastname) || checkSize(profile.lastname, 1, 20);
    newErrors.email = required(profile.email) || isEmail(profile.email);
    newErrors.username = required(profile.username) || isAlphaNumNoSpace(profile.username) || checkSize(profile.username, 5, 15);

    setErrors(newErrors);

    return Object.keys(newErrors).every((key) => !newErrors[key]);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsEditing(false);
      try {
        const updatedUser = await setUser(profile);
        setProfile(updatedUser);
        console.log("Profile updated successfully:", updatedUser);
        showToast('Profile updated successfully!', 'success');
        setTimeout(() => {
          navigate(-1);
        }, 500);
      } catch (error) {
        console.error("Failed to update profile:", error);
        showToast('Failed to update profile. Please try again later', 'error');
      }
    }
  };

  return (
    <Container fluid className="bg-light text-dark d-flex flex-column min-vh-100">
      <Header role={profile.role?.toLowerCase()} />
      <hr />
      <div className="content-container flex-grow-1 d-flex justify-content-center align-items-center">
        <Container className="mt-5 d-flex justify-content-center align-items-center" style={{ maxWidth: '600px' }}>
          <Card className="w-100">
            <Card.Header as="h4" className="text-center">Profile</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSaveClick}>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstname"
                        value={profile.firstname || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
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
                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastname"
                        value={profile.lastname || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
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
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={profile.email || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
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
                    <Form.Group controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={profile.username || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        isInvalid={!!errors.username}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={2}>
                    <Button variant={isEditing ? "success" : "primary"} onClick={isEditing ? handleSaveClick : handleEditClick}>
                      {isEditing ? "Save" : "Edit"}
                    </Button>
                  </Col>
                  <Col md={2}>
                    <BackButton />
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <hr />
      <Footer />
      <ToastNotification />
    </Container>
  );
};

export default Profile;
