import React, { useState, useEffect } from 'react';
import { Container, Row} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';


import { verifyAdmin } from '../../services/AuthService';
import { getAccountsByCustomer } from '../../services/CustomerService';
import { activateAccount, deactivateAccount } from '../../services/AccountService';


import Header from '../layout/Header';
import Footer from '../layout/Footer';

import AccountCard from '../../sharedComponents/AccountCard';
import BackButton from '../../sharedComponents/BackButton';
import Loader from '../../sharedComponents/Loader';
import ErrorPage from '../../sharedComponents/ErrorPage';

import Unauthorized from '../auth-pages/UnauthorizedAccess';

const AccountCards = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const adminStatus = await verifyAdmin();
        if (adminStatus) {
          setIsAdmin(true);
          await fetchAccounts();
        }
      } catch (error) {
        console.error('Error during admin verification:', error);
        
      }
    };

    checkAdminStatus();
  }, [navigate, id]);

  const fetchAccounts = async () => {
    try {
      const response = await getAccountsByCustomer(id);
      setAccounts(response);
    } catch (err) {
      setError('Failed to load accounts');
      console.error('Error fetching accounts:', err);
    } finally {
      setLoading(false);
    }
  };
  

  if (!isAdmin) {
    return (
      <Unauthorized/>
    );
  }

  if (loading) {
    return (
      <Loader />
    );
  }

  if (error) {
    return (
      <ErrorPage error={error}/>
    );
  }


  const handleViewTransactions = (accountNumber) => {
    navigate(`/accounts/${accountNumber}/transactions`);
  };

  const handleActivate = async (id) => {
    try {
      await activateAccount(id); 
      fetchAccounts();
    } catch (error) {
      console.error('Error activating the account:', error);
    }
  };
  const handleDeactivate = async (id) => {
    try {
      await deactivateAccount(id); 
      fetchAccounts();
    } catch (error) {
      console.error('Error deactivating the account:', error);
    }
  };
  return (
    <Container fluid className="bg-light text-dark d-flex flex-column min-vh-100">
      <Header role={"admin"} />
      <hr />
      <div className="flex-grow-1">
        <Container className="mt-5">
          <h2 className="my-4" style={{ margin: '50px' }}>Accounts</h2>
          <Row style={{ margin: '50px' }}>
            {accounts.map((account) => (
              <AccountCard
                key={account.accountNumber}
                account={account}
                onViewTransactions={handleViewTransactions}
                onDeactivateAccount={handleDeactivate}
                onActivateAccount={handleActivate}
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

export default AccountCards;
