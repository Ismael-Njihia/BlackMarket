import axios from 'axios';

export const signup = async (user) => {
    try{
        const response = await axios.post('http://localhost:5000/signup', user);
        return response.data;
    }catch(error){
        throw error;
    }
};