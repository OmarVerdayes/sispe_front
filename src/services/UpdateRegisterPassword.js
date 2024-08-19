import axios from 'axios';

export async function UpdateRegisterPassword(data) {
  try {
    const response = await axios.put(
      'https://lhgkaf7rki.execute-api.us-east-1.amazonaws.com/Prod/change_password',
       data);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}