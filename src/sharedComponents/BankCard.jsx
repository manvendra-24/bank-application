import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card,Col,Row} from 'react-bootstrap';

const BankCard = ({ bank}) => {
  const navigate = useNavigate();

  const handleAccounts = (id) => {
    navigate(`/banks/${id}/accounts`);
  };
 
  

  return (
    <Card className="mb-4 border-primary" md={6}>
      <Card.Body md={8}>
      <Row md={10}>
      <Col md={4}>
      <Card.Title className="text-primary">
            ID: {`BANK${String(bank.id).padStart(2, '0')}`}  
      </Card.Title>
      <Card.Text>
          {bank.bank_name} - ({bank.bank_abbr})
        </Card.Text>
      </Col>
      <Col md={4}>
      
      <Card.Text style={{textAlign:'center'}}>
          Total Account: {bank.totalaccounts}
        </Card.Text>
      </Col>
      <Col md={4} >
          <div>
                <button 
                  onClick={() => handleAccounts(bank.id)}
                  style={{ 
                    padding: '8px 16px', 
                    fontSize: '16px', 
                    marginLeft: '10px', 
                    borderRadius: '4px', 
                    border: '1px solid #ccc', 
                    background: '#007bff', 
                    color: 'white',
                    float:'right'
                  }}
                >
                  View Accounts
                </button>
          </div>
      </Col> 
      </Row>
      
      </Card.Body>
    </Card>
  );
};

export default BankCard;
