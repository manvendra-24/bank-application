import axios from 'axios';

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
        console.error("There was an error fetching the customer!", error);
        throw error;
    }
};


export const updateCustomer = async (id, customerData) => {
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
        console.error("Error updating customer data:", error);
        throw error;
    }
};


export const getTotalCustomers = async ()=>{
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