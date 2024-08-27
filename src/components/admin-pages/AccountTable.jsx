import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import { verifyAdmin } from '../../services/AuthService';
import { getAllAccounts } from '../../services/AccountService';
import { getAccountsByBank } from '../../services/BankService';

import SearchBar from '../../sharedComponents/SearchBar';
import Pagination from '../../sharedComponents/Pagination';
import PageSize from '../../sharedComponents/PageSize';
import TableData from '../../sharedComponents/TableData';
import PageDropdown from '../../sharedComponents/PageDropdown';

import Header from '../layout/Header';
import Footer from '../layout/Footer';

import BackButton from '../../sharedComponents/BackButton';
import Loader from '../../sharedComponents/Loader';
import ErrorPage from '../../sharedComponents/ErrorPage';

import sanitizeData from '../../utils/helpers/SanitizeData';


const AccountTable = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [noOfPages, setNoOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(10);
  const {bank_id} = useParams();
  

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const isAdmin = await verifyAdmin();
        setIsAdmin(isAdmin);
        if(!isAdmin){
          navigate('/unauthorized')
      }
      } catch (error) {
        console.error('Error during admin verification:', error);
      }
    };

    checkAdminStatus();
  }, [navigate]);

  const fetchData = useCallback((searchQuery = '') => {
    const params = {
      search: searchQuery,
      page: currentPage - 1,
      size: size,
    };

    let fetchFunction;
    if (bank_id) {
      fetchFunction = () => getAccountsByBank(bank_id, params);
    }
    else{
      fetchFunction = () => getAllAccounts(params);
    }

    if (fetchFunction) {
      fetchFunction()
        .then((responseData) => {
        const sanitizedData = sanitizeData(responseData.content);
        setData(sanitizedData);
          setNoOfPages(responseData.totalPages);
          setLoading(false);
        })
        .catch((error) => {
          setError('Failed to load accounts');
          console.error('There was an error fetching the accounts!', error);
          setLoading(false);
        });
    }
  }, [currentPage, size, bank_id]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [fetchData, isAdmin]);

  const handleSearch = (searchQuery) => {
    setLoading(true);
    fetchData(searchQuery);
  };

  
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
      <hr />
        <Container className="mt-5 flex-grow-1">
          <Row className="mb-3">
            <Col>
              <h2>Accounts Data</h2>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <SearchBar onSearch={handleSearch} />
            </Col>
            <Col md={6} className="d-flex justify-content-end align-items-center">
              <PageDropdown noOfPages={noOfPages} setPageNo={setCurrentPage} />
              <PageSize size={size} setSize={setSize} />
            </Col>
          </Row>
          {data.length > 0 && (
            <>
              <TableData data={data} accountStatus={true} fetchAccounts={fetchData} transactions={true} />
              <Pagination noOfPages={noOfPages} currentPage={currentPage} setPageNo={setCurrentPage} />
            </>
          )}
          <BackButton />
        </Container>
      <hr />
      <Footer />
    </Container>
  );
};

export default AccountTable;
