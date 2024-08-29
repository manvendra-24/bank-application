import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';

import { verifyCustomer } from '../../services/AuthService';
import { getMyAccountsCount } from '../../services/AccountService';
import { getCustomer } from '../../services/CustomerService';

import Header from '../layout/Header';
import Footer from '../layout/Footer';
import QuickAccess from '../layout/QuickAccess';
import DashboardCard from '../layout/DashboardCard';

import Loader from '../../sharedComponents/Loader';
import ErrorPage from '../../sharedComponents/ErrorPage';



const CustomerDashboard = () => {
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCustomer, setIsCustomer] = useState(false);
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({});
  const [myAccountsCount, setMyAccountsCount] = useState(0);
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    const checkCustomerStatus = async () => {
      try {
        const customerVerified = await verifyCustomer();
        if (customerVerified) {
          setIsCustomer(true);
          await fetchDashboardData();
        }else{
          navigate('/unauthorized');
        }
      } catch (error) {
        navigate('/unauthorized');
      }
    };

    const fetchDashboardData = async () => {
      try {
        const customerData = await getCustomer();
        const accountsCount = await getMyAccountsCount();
        setCustomer(customerData);
        setMyAccountsCount(accountsCount);
      } catch (error) {
        setError("Error fetching dashboard data");
      } finally {
        setLoading(false);
      }
    };

    checkCustomerStatus();
  }, [navigate]);

  if(!isCustomer){
    return null;
  }
  
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorPage />
    );
  }

  



  const buttonText = showBalance ? "Hide Balance" : "Check Balance";
  const totalbalance = showBalance? customer.totalbalance :"";
  const goToMyAccounts = () =>{
    navigate('/myaccounts');
  }
  const handleBalanceToggle = () => {
    setShowBalance(!showBalance);
  };

  return (
    <Container fluid className="bg-light text-dark d-flex flex-column min-vh-100">
      <Header role="customer" />
      <hr />
      <Container className="mt-5 flex-grow-1">
        <Row>
        <Col md={12} className="main-content">
          <Row className="mt-4">
            <Col md={12}>
              <h2>Welcome, {customer.firstname}!</h2>
              <p>Here’s a summary of your accounts.</p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={8}>
              <Row>
                <DashboardCard title="My Accounts" text={myAccountsCount} handleButton={goToMyAccounts} buttonText="View Accounts" />
                <DashboardCard title="My Balance" text={totalbalance} handleButton={handleBalanceToggle} buttonText={buttonText} height="143px" />
              </Row>
            </Col>
            <Col md={4}>
              <QuickAccess role="customer" />
            </Col>
          </Row>
        </Col>
        </Row>
      </Container>
      <hr />
      <Footer />
    </Container>
  );
};

export default CustomerDashboard;
