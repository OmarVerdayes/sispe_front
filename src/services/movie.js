export async function fetchMovies() {
    try {
      const response = await fetch(`https://3ebxnyhhp1.execute-api.us-east-1.amazonaws.com/Prod/films/`);
      const data = await response.json();
      console.log('Datos de películas obtenidos:', data); 
      return data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return []; 
    }
  }
  