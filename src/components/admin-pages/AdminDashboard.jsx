import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';


import { verifyAdmin } from '../../services/AuthService';
import { getTotalAccounts } from '../../services/AccountService';
import { getTotalCustomers } from '../../services/CustomerService';
import { getTotalBanks } from '../../services/BankService';
import { getTotalTransactions } from '../../services/TransactionService';

import Header from '../layout/Header';
import Footer from '../layout/Footer';
import QuickAccess from '../layout/QuickAccess';
import DashboardCard from '../layout/DashboardCard';

import Loader from '../../sharedComponents/Loader';
import ErrorPage from '../../sharedComponents/ErrorPage';


const AdminDashboard = () => {
    
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [totalAccounts, setTotalAccounts] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [totalBanks, setTotalBanks] = useState(0);


    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const isAdmin = await verifyAdmin();
                if (isAdmin) {
                    setIsAdmin(true);
                    await fetchDashboardData();
                }else{
                    navigate('/unauthorized');
                }
            } catch (error) {
                console.error('Error during admin verification:', error);
            }
        };

        const fetchDashboardData = async () => {
            try {
                const [accountsResponse, customersResponse, transactionsResponse, banksResponse] = await Promise.all([
                    getTotalAccounts(),
                    getTotalCustomers(),
                    getTotalTransactions(),
                    getTotalBanks()
                ]);
                setTotalAccounts(accountsResponse);
                setTotalCustomers(customersResponse);
                setTotalTransactions(transactionsResponse);
                setTotalBanks(banksResponse);
            } catch (error) {
                setError("Error fetching dashboard data");
                console.error("Error fetching dashboard data", error);
                
            }finally{
                setLoading(false);
            }
        };

        checkAdminStatus();
    }, [navigate]);

    
    if(loading) {
        return (
          <Loader />
        );
    }
    if (error) {
        return (
          <ErrorPage error={error}/>
        );
    }

    const goToCustomers = ()=>{
        navigate('/customers');
    }
    const goToAccounts = ()=>{
        navigate('/accounts');
    }
    const goToTransactions = ()=>{
        navigate('/transactions');
    }
    const goToBanks = ()=>{
        navigate('/banks');
    }
    return (
        <Container fluid className="bg-light text-dark d-flex flex-column min-vh-100">
            <Header role={"admin"}/>
            <hr/>
            <Container className="mt-5 flex-grow-1">
                <Row>
                    <Col md={12} className="main-content">
                        <Row className="mt-4">
                            <Col>
                                <h2>Welcome, Admin!</h2>
                                <p>Here’s a summary of the system status.</p>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col md={8}>
                                <Row>
                                    <DashboardCard title="Total Customers" text={totalCustomers} handleButton={goToCustomers} buttonText="View Customers"/>
                                    <DashboardCard title="Total Accounts" text={totalAccounts} handleButton={goToAccounts} buttonText="View Accounts"/>
                                </Row>
                                <Row>
                                    <DashboardCard title="Total Transactions" text={totalTransactions} handleButton={goToTransactions} buttonText="View Transactions"/>
                                    <DashboardCard title="Total Banks" text={totalBanks} handleButton={goToBanks} buttonText="View Banks"/>
                                </Row>
                            </Col>
                            <Col md={4}>
                                <QuickAccess role={"admin"}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <hr/>
            <Footer />
        </Container>
    );
}

export default AdminDashboard;
