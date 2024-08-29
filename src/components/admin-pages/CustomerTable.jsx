import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { verifyAdmin } from '../../services/AuthService';
import { getAllCustomers } from '../../services/CustomerService';

import SearchBar from '../../sharedComponents/SearchBar';
import Pagination from '../../sharedComponents/Pagination';
import PageSize from '../../sharedComponents/PageSize';
import TableData from '../../sharedComponents/TableData';
import PageDropdown from '../../sharedComponents/PageDropdown';
import BackButton from '../../sharedComponents/BackButton';
import Loader from '../../sharedComponents/Loader';
import ErrorPage from '../../sharedComponents/ErrorPage';
import ToastNotification from '../../sharedComponents/ToastNotification';

import Header from '../layout/Header';
import Footer from '../layout/Footer';

import sanitizeData from '../../utils/helpers/SanitizeData';

const CustomerTable = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [noOfPages, setNoOfPages] = useState(0);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('searchQuery') || '';
  const currentPage = parseInt(searchParams.get('page'), 10) || 1;
  const size = parseInt(searchParams.get('size'), 10) || 10;

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const isAdmin = await verifyAdmin();
        setIsAdmin(isAdmin);
        if (!isAdmin) {
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
      search: searchQuery,
      page: currentPage - 1,
      size,
    };

    getAllCustomers(params)
      .then((responseData) => {
        const sanitizedData = sanitizeData(responseData.content);
        setData(sanitizedData);
        setNoOfPages(responseData.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the customers!', error);
        setError('Error in getting customers');
        setLoading(false);
      });
  }, [searchQuery, currentPage, size]);

  useEffect(() => {
    if (isAdmin !== null) {
      fetchData();
    }
  }, [fetchData, isAdmin]);

  const handleSearch = (newSearchQuery) => {
    if(newSearchQuery !== searchQuery){
      setLoading(true);
      setSearchParams({
      searchQuery: newSearchQuery,
      page: 1,
      size,
    });
    }
  };

  const handlePageChange = (page) => {
    setLoading(true);
    setSearchParams({
      searchQuery,
      page,
      size,
    });
  };

  const handleSizeChange = (newSize) => {
    setLoading(true);
    setSearchParams({
      searchQuery,
      page: 1,
      size: newSize,
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <Container fluid className="bg-light text-dark d-flex flex-column min-vh-100">
      <Header role="admin" />
      <hr />
      <div className="content-container flex-grow-1">
        <Container className="mt-5">
          <h2>Customers Data</h2>
          <Row className="mb-3">
            <Col md={6} className="page-size-container-left">
              <SearchBar onSearch={handleSearch} defaultValue={searchQuery} />
            </Col>
            <Col md={6} className="page-size-container-right d-flex justify-content-end">
              <PageDropdown noOfPages={noOfPages} currentPage={currentPage} setPageNo={handlePageChange} />
              <PageSize size={size} setSize={handleSizeChange} />
            </Col>
          </Row>
          {data.length > 0 && (
            <div>
              <TableData data={data} accounts={true} fetchCustomers={fetchData} customerStatus={true} />
              <Pagination noOfPages={noOfPages} currentPage={currentPage} setPageNo={handlePageChange} />
            </div>
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

export default CustomerTable;
