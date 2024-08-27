import axios from 'axios';


export const getTotalBanks = async ()=>{
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8081/api/banks/count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error getting total banks:', error);
      throw error;
    }
  }


  export const getAllBanks = async () => {
    const token = localStorage.getItem('token');
    
    try {
        const response = await axios.get('http://localhost:8081/api/banks', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching banks:', error);
        throw error;
    }
};

export const getAccountsByBank = async (id,params = {}, headers = {}) => {
  const token = localStorage.getItem('token');
  
  try {
      const response = await axios.get(`http://localhost:8081/api/banks/${id}/accounts`, {
        params: params,
        headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error('Error fetching banks:', error);
      throw error;
  }
};

