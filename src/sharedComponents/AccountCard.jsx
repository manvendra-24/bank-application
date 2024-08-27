import React from 'react';
import { Card, Button } from 'react-bootstrap';

const AccountCard = ({ account, onDownloadPassbook, onViewTransactions, onDeleteAccount, onDeactivateAccount, onActivateAccount }) => {
  return (
    <Card className="mb-4 border-primary">
      <Card.Body>
        <Card.Title className="text-primary">Account Number: {account.account_number}</Card.Title>
        <Card.Text>
          <strong>Balance:</strong> Rs.{account.balance.toFixed(2)}
        </Card.Text>
        
        <div className="d-flex justify-content-between">
          {onDownloadPassbook && <Button variant="outline-primary" onClick={() => onDownloadPassbook(account.account_number)}>
            Download Passbook
          </Button>}
          {onViewTransactions && <Button variant="outline-secondary" onClick={() => onViewTransactions(account.account_number)}>
            View Transactions
          </Button>}
          {account.active && onDeactivateAccount && <Button variant="outline-danger" onClick={() => onDeleteAccount(account.account_number)}>
            Deactivate Account
          </Button>}
          {!account.active && onActivateAccount && <Button variant="outline-info" onClick={() => onActivateAccount(account.account_number)}>
            Activate Account
          </Button>}
          {onDeleteAccount && <Button variant="outline-danger" onClick={() => onDeleteAccount(account.account_number)}>
            Delete Account
          </Button>}
        </div>
      </Card.Body>
    </Card>
  );
};

export default AccountCard;
