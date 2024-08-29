import axios from 'axios';
import { NotFoundError,UnAuthorized } from '../utils/errors/Error';

export const getAllCustomers = async (params = {}, headers = {}) => {
    const token = localStorage.getItem('token');


    try {
        const response = await axios.get(`http://localhost:8081/api/customers`, {
            params: params,
            headers: {
                Authorization: `Bearer ${token}`,
                ...headers
            }
        });
        return response.data; 
    } catch (error) {
        console.error("There was an error fetching the customers!", error);
        throw error;
    }
};

export const getCustomerById = async (id, params = {}, headers = {}) => {
    if(!localStorage.getItem('token')){
        throw new UnAuthorized("User is not logged in");
    }
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`http://localhost:8081/api/customers/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                ...headers
            }
        });
        return response.data; 
    } catch (error) {
        if(error.response && error.response.status === 404){
            throw new NotFoundError("Customer not found");
        } else{
            throw error;
        }
        
    }
};


export const updateCustomer = async (id, customerData) => {
    if(!localStorage.getItem('token')){
        throw new UnAuthorized("User is not logged in");
    }
    const token = localStorage.getItem('token');
    try {
        const response = await axios.put(`http://localhost:8081/api/customers/${id}`, customerData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        if(error.response && error.response.status === 404){
            throw new NotFoundError("Customer not found");
        } else{
            throw error;
        }
        
    }
};


export const getTotalCustomers = async ()=>{
    if(!localStorage.getItem('token')){
        throw new UnAuthorized("User is not logged in");
    }
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8081/api/customers/count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error getting total customers:', error);
      throw error;
    }

  }


  export const getCustomer = async (headers = {}) => {
    if(!localStorage.getItem('token')){
        throw new UnAuthorized("User is not logged in");
    }
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`http://localhost:8081/api/customer`, {
            headers: {
                Authorization: `Bearer ${token}`,
                ...headers
            }
        });
        return response.data; 
    } catch (error) {
        console.error("There was an error fetching the customer!", error);
        throw error;
    }
};

export const getAccountsByCustomer = async (id, params = {}, headers = {}) => {
    if(!localStorage.getItem('token')){
        throw new UnAuthorized("User is not logged in");
    }
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`http://localhost:8081/api/customers/${id}/accounts`, {
            headers: {
                Authorization: `Bearer ${token}`,
                ...headers
            }
        });
        console.log(response.data);
        return response.data; 
    } catch (error) {
        console.error("There was an error fetching the customer!", error);
        throw error;
    }
};

export const addCustomer = async (userData) => {
    try {
      const response = await axios.post(`http://localhost:8081/api/auth/registerCustomer`, userData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const addAdmin = async (userData,  headers={})=>{
    if(!localStorage.getItem('token')){
        throw new UnAuthorized("User is not logged in");
    }
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`http://localhost:8081/api/auth/registerAdmin`,
            userData, 
            {
            headers: {
                Authorization: `Bearer ${token}`,
                ...headers
            }
        });
        console.log(response.data);
        return response.data; 
    } catch (error) {
        console.error("There was an error fetching the customer!", error);
        throw error;
    }
  }

  export const deactivateCustomer = async (id) => {
    if(!localStorage.getItem('token')){
        throw new UnAuthorized("User is not logged in");
    }
    const token = localStorage.getItem('token');
  
    try {
      await axios.put(`http://localhost:8081/api/customers/${id}/delete`, null,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  };

  export const activateCustomer = async (id) => {
    if(!localStorage.getItem('token')){
        throw new UnAuthorized("User is not logged in");
    }
    const token = localStorage.getItem('token');

    try {
        const response = await axios.put(`http://localhost:8081/api/customers/${id}/activate`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('There was an error activating the customer!', error);
        throw error;
    }
};