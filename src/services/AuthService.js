import axios from 'axios';

export const verifyAdmin = async (headers = {}) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`http://localhost:8081/api/auth/verifyAdmin`, {
            headers: {
                Authorization: `Bearer ${token}`,
                ...headers
            }
        });
        return response.data;
    } catch (error) {
        console.error("There was an error verifying admin status!", error);
        throw error;
    }
};

export const verifyCustomer = async (headers = {}) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`http://localhost:8081/api/auth/verifyCustomer`, {
            headers: {
                Authorization: `Bearer ${token}`,
                ...headers
            }
        });
        return response.data;
    } catch (error) {
        console.error("There was an error verifying customer status!", error);
        throw error;
    }
};


export const loginService = async (email, password) => {
    try {
      const response = await axios.post(`http://localhost:8081/api/auth/login`, { email, password }, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      console.error("There was an error logging in!", error);
      throw new Error('Error logging in. Please try again.');
    }
  };
  

  export const getUser = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('http://localhost:8081/api/auth/profile', {
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


  export const setUser = async (userData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.put('http://localhost:8081/api/auth/profile', 
            userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};
