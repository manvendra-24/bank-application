import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { verifyCustomer } from '../../services/AuthService';
import { getTransactionsByMyAccount } from '../../services/AccountService';

import DateRangePicker from '../../sharedComponents/DateRangePicker';
import Pagination from '../../sharedComponents/Pagination';
import PageSize from '../../sharedComponents/PageSize';
import TableData from '../../sharedComponents/TableData';
import PageDropdown from '../../sharedComponents/PageDropdown';
import BackButton from '../../sharedComponents/BackButton';
import ErrorPage from '../../sharedComponents/ErrorPage';
import Loader from '../../sharedComponents/Loader';

import Header from '../layout/Header';
import Footer from '../layout/Footer';

import sanitizeData from '../../utils/helpers/SanitizeData';

const MyTransactions = () => {
  const [isCustomer, setIsCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState([]);
  const [noOfPages, setNoOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page')) || 1
  );
  const [size, setSize] = useState(parseInt(searchParams.get('size')) || 10);
  const [startDate, setStartDate] = useState(searchParams.get('startDate') || '');
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || '');

  useEffect(() => {
    const checkCustomerStatus = async () => {
      try {
        const customerStatus = await verifyCustomer();
        setIsCustomer(customerStatus);
        if (!customerStatus) {
          navigate('/unauthorized');
        }
      } catch (error) {
        console.error('Error during customer verification:', error);
      }
    };

    checkCustomerStatus();
  }, [navigate]);

  const fetchData = useCallback(
    (startDate, endDate) => {
      const params = {
        startDate: startDate,
        endDate: endDate,
        page: currentPage - 1,
        size: size,
      };
      let fetchFunction;
      if (id) {
        fetchFunction = () => getTransactionsByMyAccount(id, params);
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
    },
    [currentPage, size, startDate, endDate, id]
  );

  useEffect(() => {
    if (isCustomer) {
      fetchData(startDate, endDate);
    }
  }, [fetchData, isCustomer, startDate, endDate]);

  useEffect(() => {
    setSearchParams({
      page: currentPage,
      size: size,
      startDate: startDate || '',
      endDate: endDate || '',
    });
  }, [currentPage, size, startDate, endDate, setSearchParams]);

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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <Container fluid className="bg-light text-dark d-flex flex-column min-vh-100">
      <Header role={'customer'} />
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
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                onSearch={handleSearch}
              />
            </Col>
            <Col md={6} className="d-flex justify-content-end align-items-center">
              <PageDropdown
                noOfPages={noOfPages}
                currentPage={currentPage}
                setPageNo={setCurrentPage}
              />
              <PageSize size={size} setSize={setSize} />
            </Col>
          </Row>
          {data.length > 0 && (
            <>
              <TableData data={data} fetchData={fetchData} />
              <Pagination
                noOfPages={noOfPages}
                currentPage={currentPage}
                setPageNo={setCurrentPage}
              />
            </>
          )}
          <BackButton />
        </Container>
      </div>
      <hr />
      <Footer />
    </Container>
  );
};

export default MyTransactions;
