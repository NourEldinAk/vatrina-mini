import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.vetrinas.ly/', 
  headers: { 
    'Content-Type': 'application/json' ,
    'Origin': "https://nooreldin.vetrinas.ly"
  
  }, 
});

export default instance;
