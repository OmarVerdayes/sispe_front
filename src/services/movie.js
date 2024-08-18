import { uploadFile } from './cloudinaryUpload';

export async function createMovie(movie) {
  try {
    const frontPageUrl = movie.front_page ? await uploadFile(movie.front_page) : null;
    const bannerUrl = movie.banner ? await uploadFile(movie.banner) : null;
    const fileUrl = movie.file ? await uploadFile(movie.file) : null;

    const response = await fetch('https://dld295hsy3.execute-api.us-east-1.amazonaws.com/Prod/film', {
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
        file: fileUrl,
        banner:bannerUrl
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
  const token = localStorage.getItem('authUser'); 
  const parsedToken = token ? JSON.parse(token).id_token : null; 

  if (!parsedToken) {
    console.error('No se encontró id_token en el almacenamiento local');
    return [];
  }

  try {
    const response = await fetch('https://dld295hsy3.execute-api.us-east-1.amazonaws.com/Prod/films', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${parsedToken}`, 
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error en la respuesta de la API:', errorText);
      throw new Error(`Error al obtener peliculas: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export async function byCategories() {
  const token = localStorage.getItem('authUser'); 
  const parsedToken = token ? JSON.parse(token).id_token : null; 

  if (!parsedToken) {
    console.error('No se encontró id_token en el almacenamiento local');
    return [];
  }

  try {
    const response = await fetch('https://dld295hsy3.execute-api.us-east-1.amazonaws.com/Prod/films/category', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${parsedToken}`, 
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error en la respuesta de la API:', errorText);
      throw new Error(`Error al obtener categorías: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}