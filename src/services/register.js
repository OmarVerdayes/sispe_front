// register.js
import axios from 'axios';

export async function registerUser(userData) {
  try {
    const response = await axios.post('https://lhgkaf7rki.execute-api.us-east-1.amazonaws.com/Prod/register_user', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // Asegúrate de lanzar el error para manejarlo en el frontend
  }
}
