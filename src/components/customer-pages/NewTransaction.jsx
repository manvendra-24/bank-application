import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { getMyAccounts } from '../../services/AccountService';
import { processTransaction } from '../../services/TransactionService';
import { verifyCustomer } from '../../services/AuthService';

import Header from '../layout/Header';
import Footer from '../layout/Footer';

import BackButton from '../../sharedComponents/BackButton';


const NewTransaction = () => {
  const [transactionType, setTransactionType] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [receiverAccount, setReceiverAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [isCustomer, setCustomer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAndFetchAccounts = async () => {
      try {
        const isCustomerVerified = await verifyCustomer();
        if (isCustomerVerified) {
          setCustomer(true);
          const accountsList = await getMyAccounts();
          setAccounts(accountsList);
        }else{
          navigate('/unauthorized');
        }
      } catch (error) {
        setError('Verification failed. Please try again.');
        navigate('/unauthorized');
      }
    };
    verifyAndFetchAccounts();
  }, []);

  const handleTransactionTypeChange = (event) => {
    setTransactionType(event.target.value);
    setSelectedAccount('');
    setReceiverAccount('');
    setAmount('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let requestPayload = {};

    if (transactionType === 'Transfer') {
      requestPayload = {
        type: transactionType,
        sender_account: selectedAccount,
        receiver_account: receiverAccount,
        amount: parseInt(amount),
      };
    } else {
      requestPayload = {
        type: transactionType,
        account: selectedAccount,
        amount: parseInt(amount),
      };
    }

    try {
      await processTransaction(requestPayload);
      alert('Transaction successful!');
      navigate(-1);
    } catch (error) {
      console.error('Transaction failed', error);
      setError('Transaction failed. Please try again.');
    }
  };

  if (!isCustomer) {
    return null;
  }

  return (
    <Container fluid className="bg-light text-dark d-flex flex-column min-vh-100">
      <Header role={"customer"} />
      <hr />
      <div className="flex-grow-1">
      <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>New Transaction</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="transactionType">
              <Form.Label>Transaction Type</Form.Label>
              <Form.Control as="select" value={transactionType} onChange={handleTransactionTypeChange}>
                <option value="">Select a type</option>
                <option value="Deposit">Deposit</option>
                <option value="Withdrawal">Withdrawal</option>
                <option value="Transfer">Transfer</option>
              </Form.Control>
            </Form.Group>

            {(transactionType === 'Deposit' || transactionType === 'Withdrawal') && (
              <>
                <Form.Group controlId="accountNumber">
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control as="select" value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
                    <option value="">Select an account</option>
                    {accounts.map((account) => (
                      <option key={account.account_number} value={account.account_number}>
                        {account.account_number}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="amount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </Form.Group>
              </>
            )}

            {transactionType === 'Transfer' && (
              <>
                <Form.Group controlId="senderAccountNumber">
                  <Form.Label>Sender Account Number</Form.Label>
                  <Form.Control as="select" value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
                    <option value="">Select an account</option>
                    {accounts.map((account) => (
                      <option key={account.account_number} value={account.account_number}>
                        {account.account_number}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="receiverAccountNumber">
                  <Form.Label>Receiver Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={receiverAccount}
                    onChange={(e) => setReceiverAccount(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="amount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </Form.Group>
              </>
            )}
                <Row className="d-flex justify-content-between" style={{marginTop:'20px'}}>
                  <Col md={5}>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Col>
                  <Col md="auto">
                    <BackButton />
                  </Col>
                </Row>
          </Form>
        </Col>
      </Row>
      </Container>
      </div>
      <hr />
      <Footer />
    </Container>
  );
};

export default NewTransaction;
