import { uploadFile } from './cloudinaryUpload';

export async function createMovie(movie) {
  try {
    const frontPageUrl = movie.front_page ? await uploadFile(movie.front_page) : null;
    const fileUrl = movie.file ? await uploadFile(movie.file) : null;

    const response = await fetch('https://djpg1wqrj2.execute-api.us-east-1.amazonaws.com/Prod/film/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: movie.title,
        description: movie.description,
        length: movie.length,
        status: movie.status,
        fk_category: movie.fk_category,
        front_page: frontPageUrl,
        file: fileUrl
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error en la respuesta de la API:', errorText);
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Película registrada:', data);
    return data;
  } catch (error) {
    console.error('Error al registrar la película:', error);
    throw error;
  }
}

export async function fetchMovies() {
  try {
    const response = await fetch('https://djpg1wqrj2.execute-api.us-east-1.amazonaws.com/Prod/films/');
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error en la respuesta de la API:', errorText);
      throw new Error(`Error al obtener las películas: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Datos de películas obtenidos:', data);
    return data;
  } catch (error) {
    console.error('Error al obtener las películas:', error);
    return [];
  }
}

