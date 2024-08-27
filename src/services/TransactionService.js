import axios from 'axios';


export const getTotalTransactions = async ()=>{
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8081/api/transactions/count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error getting total transactions:', error);
      throw error;
    }
  }


  export const getAllTransactions = async (params = {}, headers = {})=>{
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8081/api/transactions`, {
        params: params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
      
      return response.data;
    } catch (error) {
      console.error('Error getting all transactions:', error);
      throw error;
    }

  }


  export const getMyTransactionsCount = async (params = {}, headers = {})=>{
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8081/api/mytransactions/count`, {

        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
      
      return response.data;
    } catch (error) {
      console.error('Error getting my transactions count:', error);
      throw error;
    }

  }



  
  export const processTransaction = async (transactionData) => {
    const { type } = transactionData;
    let url = '';
  
    switch (type) {
      case 'Deposit':
        url = `http://localhost:8081/api/mytransactions/deposit`;
        break;
      case 'Withdrawal':
        url = `http://localhost:8081/api/mytransactions/withdrawal`;
        break;
      case 'Transfer':
        url = `http://localhost:8081/api/mytransactions/transfer`;
        break;
      default:
        throw new Error('Invalid transaction type');
    }
  
    try {
      const response = await axios.post(url, transactionData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error processing transaction:', error);
      throw error;
    }
  };
  
  
