import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-3">
      <Container>
        <Row className="justify-content-center">
          <Col className="text-center">
            <p className="mb-0">© 2024 BankApp. All rights reserved.</p>
            <p className="mb-0">
              <span className="text-dark text-decoration-none me-2">Documentation</span> |
              <span className="text-dark text-decoration-none ms-2">Support</span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
