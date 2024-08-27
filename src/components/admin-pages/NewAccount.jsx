import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card} from 'react-bootstrap';

import { getAllBanks } from '../../services/BankService';
import { createAccount } from '../../services/AccountService';
import { verifyAdmin } from '../../services/AuthService';

import Header from '../layout/Header';
import Footer from '../layout/Footer';
import BackButton from '../../sharedComponents/BackButton';
import { Toast } from 'react-bootstrap';
import ErrorPage from '../../sharedComponents/ErrorPage';
import Loader from '../../sharedComponents/Loader';


const CreateAccount = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customer_id, setCustomerId] = useState('');
  const [bank_id, setBankId] = useState('');
  const [banks, setBanks] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const isAdmin = await verifyAdmin();
        setIsAdmin(isAdmin);
        setLoading(false);
      } catch (error) {
        console.error('Error during admin verification:', error);
        navigate('/unauthorized');
      }
    };

    checkAdminStatus();
  }, [navigate]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const banksData = await getAllBanks();
        setBanks(banksData);
      } catch (error) {
        console.error('Failed to fetch banks:', error);
        setError('Failed to fetch banks');
      }
    };

    fetchBanks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const accountData = {
      customer_id,
      bank_id,
    };

    try {
      await createAccount(accountData);
      setSuccess("Accout created successfully")
    } catch (error) {
      console.error('Failed to create account:', error);
      setError('Failed to create account');
    }
    setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate(-1);
      }, 2000);
  };


  if (loading) {
    return (
      <Loader/>
    );
  }

  if (error) {
    return (
      <ErrorPage/>
    );
  }

  return (
    <Container fluid className="bg-light text-dark d-flex flex-column min-vh-100">
      <Header role="admin"/>
      <hr />
      <div className="content-container flex-grow-1 d-flex justify-content-center align-items-center">
        <Container className="mt-5 d-flex justify-content-center align-items-center" style={{ maxWidth: '600px' }}>
          <Card className="w-100">
            <Card.Header as="h4" className="text-center">Create New Account</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="customerId">
                      <Form.Label>Customer ID</Form.Label>
                      <Form.Control
                        type="text"
                        value={customer_id}
                        onChange={(e) => setCustomerId(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="bankSelect">
                      <Form.Label>Select Bank</Form.Label>
                      <Form.Control
                        as="select"
                        value={bank_id}
                        onChange={(e) => setBankId(e.target.value)}
                        required
                      >
                        <option value="" disabled>Select a bank</option>
                        {banks.map(bank => (
                          <option key={bank.id} value={bank.id}>
                            {bank.bank_name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="d-flex justify-content-between">
                    <Col md={5}>
                      <Button variant="primary" type="submit">
                        Create Account
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
      <hr />
      <Footer />
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

export default CreateAccount;
