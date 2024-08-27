import React from 'react';
import { Button} from 'react-bootstrap';

const OutlineButton = ({ variant, handleButton, text, icon: Icon}) => {
  return (
    <Button 
      variant={variant} 
      className="mb-3 d-flex align-items-center justify-content-start w-100"
      onClick={handleButton}
    >
      {Icon && <Icon className="me-2" />}
      {text}
    </Button>
  );
}

export default OutlineButton;
