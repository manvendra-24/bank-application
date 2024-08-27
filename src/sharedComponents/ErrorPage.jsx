import React from 'react'
import {Container, Alert} from 'react-bootstrap';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';


const ErrorPage = ({error}) => {
  return (
    <Container fluid className="bg-light text-dark d-flex flex-column min-vh-100">
        <Header />
        <Container className="mt-5 flex-grow-1">
            <Alert variant="danger" className="text-center">
                {error}
            </Alert>
        </Container>
        <Footer />
    </Container>
  )
}

export default ErrorPage