import React from 'react';
import { Col, Card} from 'react-bootstrap';
import { FaUserPlus, FaPlusCircle, FaExchangeAlt, FaUserShield } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import OutlineButton from '../../sharedComponents/OutlineButton';

const QuickAccess = ({role}) => {
    const navigate = useNavigate();

    const handleCustomer = () => {
        navigate('/new-customer');
    };
    const handleAdmin = () => {
        navigate('/new-admin');
    };
    const handleAccount = () => {
        navigate('/new-account');
    };

    const handleTransaction = () => {
        navigate('/new-transaction');
    };

    const cardHeight = role === "admin" ? '273px' : '105px';

    return (
        <Col md={12}>
            <h4>Quick Actions</h4>
            <Card style={{ height: cardHeight }}>
                <Card.Body>
                    {role === "admin" && (
                        <>
                            <OutlineButton variant="outline-primary" handleButton={handleCustomer} text="New Customer" icon={FaUserPlus}/>
                            <OutlineButton variant="outline-secondary" handleButton={handleAccount} text="New Account" icon={FaPlusCircle}/>
                            <OutlineButton variant="outline-dark" handleButton={handleAdmin} text="New Admin" icon={FaUserShield}/>
                        </>
                    )}
                    {role === "customer" && (
                        <OutlineButton variant="outline-primary" handleButton={handleTransaction} text="New Transaction" icon={FaExchangeAlt}/>
                    )}
                </Card.Body>
            </Card>
        </Col>
    );
};

export default QuickAccess;
