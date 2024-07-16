import axios from 'axios';

const API_URL = 'https://m97nrc17x0.execute-api.us-east-1.amazonaws.com/Prod';

class AuthService {
  login(user) {
    return axios
      .post(`${API_URL}/login`, {
        email: user.email,
        password: user.password,
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
