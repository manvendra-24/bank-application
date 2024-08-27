import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import BackButton from '../../sharedComponents/BackButton';
import { getUser, setUser } from '../../services/AuthService';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUser();
        setProfile(userData);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      const updatedUser = await setUser(profile);
      setProfile(updatedUser);
      console.log("Profile updated successfully:", updatedUser);
    } catch (error) {
      console.error("Failed to update profile:", error);
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
              <Form>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstname"
                        value={profile.firstname}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
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
                        value={profile.lastname}
                        onChange={handleChange}
                        disabled={!isEditing}
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
                        value={profile.email}
                        onChange={handleChange}
                        disabled={!isEditing}
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
                        value={profile.username}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
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
    </Container>
  );
};

export default Profile;
