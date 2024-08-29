import axios from 'axios';
import {NotFoundError} from '../utils/errors/Error';




export const getAllAccounts = async (params = {}, headers = {}) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`http://localhost:8081/api/accounts`, {
            params: params,
            headers: {
                Authorization: `Bearer ${token}`,
                ...headers
            }
        });
        return response.data; 
    } catch (error) {
        console.error("There was an error fetching the accounts!", error);
        throw error;
    }
};


export const activateAccount = async (id) => {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.put(`http://localhost:8081/api/accounts/${id}/activate`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('There was an error activating the account!', error);

        throw error;
    }
};

export const deactivateAccount = async (id) => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.put(`http://localhost:8081/api/accounts/${id}/delete`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('There was an error deleting the account!', error);

      throw error;
    }
  };



export const getMyAccounts = async () => {
    const token = localStorage.getItem('token');
    
    try {
        const response = await axios.get('http://localhost:8081/api/myaccounts', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching accounts:', error);

        throw error;
    }
};


export const downloadPassbook = async (accountId) => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.get(`http://localhost:8081/api/myaccounts/${accountId}/passbook/download`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Error downloading passbook:', error);

      throw error;
    }
  };

  export const deleteAccount = async (accountId) => {
    const token = localStorage.getItem('token');
  
    try {
      await axios.delete(`http://localhost:8081/api/myaccounts/${accountId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error deleting account:', error);

      throw error;
    }
  };


  export const getTotalAccounts = async ()=>{
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8081/api/accounts/count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error getting total accounts:', error);

      throw error;
    }

  }

  export const getTransactionsByAccount = async (id, params = {}, headers = {})=>{
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8081/api/accounts/${id}/transactions`, {
        params:params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if(error.response && error.response.status === 404){
          throw new NotFoundError("Account not found");
      } else{
          throw error;
      }
      
  }

  }

  export const getMyAccountsCount = async (params = {}, headers = {})=>{
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8081/api/myaccounts/count`, {

        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
      
      return response.data;
    } catch (error) {
      console.error('Error getting my accounts count:', error);

      throw error;
    }

  }

  export const getTransactionsByMyAccount = async (id, params = {}, headers = {})=>{
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8081/api/myaccounts/${id}/transactions`, {
        params:params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if(error.response && error.response.status === 404){
          throw new NotFoundError("Account not found");
      } else{
          throw error;
      }
      
  }

  }

  export const createAccount = async (accountData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `http://localhost:8081/api/accounts`,
        accountData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating account:', error);

      throw error;
    }
  };
  


