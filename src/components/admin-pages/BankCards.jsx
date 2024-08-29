import React, { useState, useEffect } from 'react';
import { Container, Row} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { verifyAdmin } from '../../services/AuthService';
import { getAllBanks } from '../../services/BankService';

import Header from '../layout/Header';
import Footer from '../layout/Footer';

import BankCard from '../../sharedComponents/BankCard';
import BackButton from '../../sharedComponents/BackButton';
import ErrorPage from '../../sharedComponents/ErrorPage';
import Loader from '../../sharedComponents/Loader';
import ToastNotification, { showToast } from '../../sharedComponents/ToastNotification';


import Unauthorized from '../auth-pages/UnauthorizedAccess';


const BankCards = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [banks, setBanks] = useState([]);


  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const adminStatus = await verifyAdmin();
        if (adminStatus) {
          setIsAdmin(true);
          fetchBanks();
        }
      } catch (error) {
        console.error('Error during admin verification:', error);
        navigate('/unauthorized');
      }
    };

    
    

    checkAdminStatus();
  }, [navigate]);

  const fetchBanks = async () => {
    try {
      const response = await getAllBanks();
      setBanks(response);
    } catch (err) {
      setError('Failed to load banks');
      console.error('Error fetching banks:', err);
    } finally {
      setLoading(false);
    }
  };
  if (!isAdmin) {
    return(
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

  return (
    <Container fluid className="bg-light text-dark d-flex flex-column min-vh-100">
      <Header role={"admin"}/>
      <hr/>
      <div className="flex-grow-1">
        <Container className="mt-5">
          <h2 className="my-4" style={{ margin: '50px' }}>Banks</h2>
          <Row style={{ margin: '50px' }}>
            {banks.map((bank) => (
              <BankCard
                key={bank.bank_id}
                bank={bank}
                fetchData={fetchBanks}
              />
            ))}
          </Row>
          <BackButton/>
        </Container>
      </div>
      <hr/>
      <Footer />
      <ToastNotification />

    </Container>
  );
};

export default BankCards;
