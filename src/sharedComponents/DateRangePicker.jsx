import React, {useState} from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const DateRangePicker = ({onSearch }) => {

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(startDate, endDate);
  };

  const handleResetClick = () => {
    setStartDate('');
    setEndDate('');
    onSearch(startDate, endDate);
  };

  return (
    <Form>
      <Row>
        <Col md={4}>
          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </Form.Group>
        </Col>
        <Col md={4} className="d-flex align-items-end">
          <Button variant="primary" onClick={handleSearchClick} className="me-2">
            Search
          </Button>
          <Button variant="secondary" onClick={handleResetClick}>
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default DateRangePicker;
