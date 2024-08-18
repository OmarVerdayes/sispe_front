import axios from 'axios';

const API_URL = 'https://lhgkaf7rki.execute-api.us-east-1.amazonaws.com/Prod/';
const API_USER_URL = `${API_URL}/user/`; 

class AuthService {
  async login(user) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: user.email,
        password: user.password,
      });
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const response = await axios.get(`${API_USER_URL}${email}`);
      return response.data.user;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('authUser');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getIdToken() {
    const user = this.getCurrentUser();
    return user ? user.token : null; // Asegúrate de usar 'token' si es así en el objeto guardado.
  }
}

export default new AuthService();
