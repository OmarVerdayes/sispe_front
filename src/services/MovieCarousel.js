import axios from 'axios';

const API_URL = 'https://djpg1wqrj2.execute-api.us-east-1.amazonaws.com/Prod';

class FilmService {
  getRandomFilm() {
    return axios.get(`${API_URL}/films/random`)
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching random film:", error);
      });
  }
}

export default new FilmService();
