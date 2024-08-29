import axios from 'axios';
import {UnAuthorized, InvalidCredentialError} from '../utils/errors/Error';

export const verifyAdmin = async (headers = {}) => {
    if(!localStorage.getItem('token')){
        throw new UnAuthorized("User is not logged in");
    }
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
        throw error;
    }
};

export const verifyCustomer = async (headers = {}) => {
    if(!localStorage.getItem('token')){
        throw new UnAuthorized("User is not logged in");
    }
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
        if(error.response && error.response.status === 400){
            throw new InvalidCredentialError("Invalid Credentials");
        }else{
            throw error;
        }
    }
  };
  

  export const getUser = async () => {
    if(!localStorage.getItem('token')){
        throw new UnAuthorized("User is not logged in");
    }
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
    if(!localStorage.getItem('token')){
        throw new UnAuthorized("User is not logged in");
    }
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
