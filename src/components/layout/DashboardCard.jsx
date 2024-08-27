import React from 'react';
import { Col, Card } from 'react-bootstrap';

import NewButton from '../../sharedComponents/NewButton';

const DashboardCard = ({ title, text, handleButton, buttonText, height }) => {
  return (
    <Col md={6}>
      <Card className="mb-4" style={height ? { height: height } : {}}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
          <NewButton handleButton={handleButton} text={buttonText} />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default DashboardCard;
