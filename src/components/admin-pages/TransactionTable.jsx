import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { verifyAdmin } from '../../services/AuthService';
import { getAllTransactions } from '../../services/TransactionService';
import { getTransactionsByAccount } from '../../services/AccountService';

import DateRangePicker from '../../sharedComponents/DateRangePicker'; 
import Pagination from '../../sharedComponents/Pagination';
import PageSize from '../../sharedComponents/PageSize';
import TableData from '../../sharedComponents/TableData';
import PageDropdown from '../../sharedComponents/PageDropdown';
import BackButton from '../../sharedComponents/BackButton';
import ErrorPage from '../../sharedComponents/ErrorPage';
import Loader from '../../sharedComponents/Loader';
import ToastNotification from '../../sharedComponents/ToastNotification';

import Header from '../layout/Header';
import Footer from '../layout/Footer';

import sanitizeData from '../../utils/helpers/SanitizeData';

const TransactionTable = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [data, setData] = useState([]);
  const [noOfPages, setNoOfPages] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';
  const currentPage = parseInt(searchParams.get('page'), 10) || 1;
  const size = parseInt(searchParams.get('size'), 10) || 10;

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const adminStatus = await verifyAdmin();
        setIsAdmin(adminStatus);
        if (!adminStatus) {
          navigate('/unauthorized');
        }
      } catch (error) {
        console.error('Error during admin verification:', error);
        navigate('/unauthorized');
      }
    };

    checkAdminStatus();
  }, [navigate]);

  const fetchData = useCallback(() => {
    const params = {
      startDate,
      endDate,
      page: currentPage - 1,
      size,
    };

    let fetchFunction;
    if (id) {
      fetchFunction = () => getTransactionsByAccount(id, params);
    } else {
      fetchFunction = () => getAllTransactions(params);
    }

    fetchFunction()
      .then((responseData) => {
        const sanitizedData = sanitizeData(responseData.content);
        setData(sanitizedData);
        setNoOfPages(responseData.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to load transactions');
        console.error('There was an error fetching the transactions!', error);
        setLoading(false);
      });
  }, [id, startDate, endDate, currentPage, size]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [fetchData, isAdmin]);

  const handleSearch = (newStartDate, newEndDate) => {
    if(startDate !== newStartDate && endDate !== newEndDate){
      setLoading(true);
      setSearchParams({
      startDate: newStartDate || '',
      endDate: newEndDate || '',
      page: 1,
      size,
    });
    }
  };

  const handlePageChange = (page) => {
    setLoading(true);
    setSearchParams({
      startDate,
      endDate,
      page,
      size,
    });
  };

  const handleSizeChange = (newSize) => {
    setLoading(true);
    setSearchParams({
      startDate,
      endDate,
      page: 1,
      size: newSize,
    });
  };

  if(!isAdmin){
    return null;
  }
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <Container fluid className="bg-light text-dark d-flex flex-column min-vh-100">
      <Header role={"admin"} />
      <hr />
      <div className="flex-grow-1">
        <Container className="mt-5">
          <Row className="mb-3">
            <Col>
              <h2>Transactions Data</h2>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                setStartDate={(date) => handleSearch(date, endDate)}
                setEndDate={(date) => handleSearch(startDate, date)}
                onSearch={handleSearch}
              />
            </Col>
            <Col md={6} className="d-flex justify-content-end align-items-center">
              <PageDropdown noOfPages={noOfPages} currentPage={currentPage} setPageNo={handlePageChange} />
              <PageSize size={size} setSize={handleSizeChange} />
            </Col>
          </Row>
          {data.length > 0 && (
            <>
              <TableData data={data} fetchData={fetchData} />
              <Pagination noOfPages={noOfPages} currentPage={currentPage} setPageNo={handlePageChange} />
            </>
          )}
          <BackButton />
        </Container>
      </div>
      <hr />
      <Footer />
      <ToastNotification />
    </Container>
  );
};

export default TransactionTable;
