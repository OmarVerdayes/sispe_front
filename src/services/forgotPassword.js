import axios from 'axios';
const url ='https://lhgkaf7rki.execute-api.us-east-1.amazonaws.com/Prod/user/recover_password'
export async function sendCode(email) {
  try {
    const response = await axios.post(url, {email});
    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // Asegúrate de lanzar el error para manejarlo en el frontend
  }
}


export async function changePassword(data){
    try {
        const response = await axios.post(url,data)
        return response;
    } catch (error) {
        console.error('Error al cambiar la contrasena,',error);
        throw error;
    }
}