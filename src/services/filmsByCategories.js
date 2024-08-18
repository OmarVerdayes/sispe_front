import axios from 'axios';

async function fetchFilms() {
    try {
        const response = await axios.get('https://dld295hsy3.execute-api.us-east-1.amazonaws.com/Prod/films/category');
        
        const data = response.data;
        
        processFilmData(data);
    } catch (error) {
        console.error('Error al obtener las películas:', error);
    }
}

function processFilmData(data) {
    for (const [category, films] of Object.entries(data)) {
        console.log(`Categoría: ${category}`);
        films.forEach(film => {
            console.log(`Título: ${film.title}`);
            console.log(`Descripción: ${film.description}`);
            console.log(`Duración: ${film.length} horas`);
            console.log(`Estado: ${film.status}`);
            console.log(`Imagen de portada: ${film.front_page}`);
            console.log(`Archivo de video: ${film.file}`);
            console.log('---');
        });
    }
}

fetchFilms();
