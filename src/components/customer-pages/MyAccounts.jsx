import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { verifyCustomer } from '../../services/AuthService';
import { getMyAccounts, deleteAccount,downloadPassbook } from '../../services/AccountService';

import AccountCard from '../../sharedComponents/AccountCard';
import BackButton from '../../sharedComponents/BackButton';
import Loader from '../../sharedComponents/Loader';
import ErrorPage from '../../sharedComponents/ErrorPage';

import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Unauthorized from '../auth-pages/UnauthorizedAccess';

const MyAccounts = () => {
  const [isCustomer, setIsCustomer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);


  useEffect(() => {
    const checkCustomerStatus = async () => {
      try {
        const isCustomer = await verifyCustomer();
        if (isCustomer) {
          setIsCustomer(true);
          fetchAccounts();
        } else{
          navigate('/unauthorized')
        }
      } catch (error) {
        console.error('Error during customer verification:', error);
      }
    };

    const fetchAccounts = async () => {
      try {
        const response = await getMyAccounts();
        setAccounts(response);
      } catch (err) {
        setError('Failed to load accounts');
        console.error('Error fetching accounts:', err);
      } finally {
        setLoading(false);
      }
    };

    checkCustomerStatus();
  }, [navigate]);

  const handleDownloadPassbook = async (accountNumber) => {
    try {
      const blob = await downloadPassbook(accountNumber);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `passbook_${accountNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error('Error downloading passbook:', err);
    }
  };

  const handleViewTransactions = (id) => {
    navigate(`/myaccounts/${id}/transactions`)
  };

  const handleDeleteAccount = async (account_number) => {
    console.log(account_number);
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await deleteAccount(account_number);
        setAccounts((prevAccounts) => prevAccounts.filter((account) => account.account_number !== account_number));
      } catch (err) {
        console.error('Error deleting account:', err);
      }
    }
  };

  if (!isCustomer) {
    return(
      <Unauthorized/>
    );
  }

  if (loading) {
    return (
        <Loader/>
    );
  }

  if (error) {
    return (
      <ErrorPage error={error}/>
    );
  }

  return (
    <Container fluid className="bg-light text-dark d-flex flex-column min-vh-100">
      <Header role={"customer"} />
      <hr />
      <div className="flex-grow-1">
        <Container className="mt-5">
          <h2 className="my-4" style={{ margin: '50px' }}>My Accounts</h2>
          <Row style={{ margin: '50px' }}>
            {accounts.map((account) => (
              <AccountCard
              key={account.account_number}
              account={account}
              onDownloadPassbook={() => handleDownloadPassbook(account.account_number)}
              onViewTransactions={() => handleViewTransactions(account.account_number)}
              onDeleteAccount={() => handleDeleteAccount(account.account_number)}
            />
            ))}
            
          </Row>
          <BackButton/>
        </Container>
        
      </div>
      <hr />
      <Footer />
    </Container>
  );
};

export default MyAccounts;
