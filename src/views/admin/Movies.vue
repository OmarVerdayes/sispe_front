<template>
  <div class="main-container">
    <h1>Registro de Películas</h1>
    <form @submit.prevent="submitForm" class="movie-form">
      <label for="title">Título:</label>
      <input type="text" id="title" v-model="movie.title" required>
      
      <label for="description">Descripción:</label>
      <textarea id="description" v-model="movie.description" required></textarea>
      
      <label for="length">Duración (minutos):</label>
      <input type="number" id="length" v-model.number="movie.length" required>
      
      <label for="status">Estado:</label>
      <select id="status" v-model="movie.status" required>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>
      
      <label for="fk_category">Categoría:</label>
      <select id="fk_category" v-model="movie.fk_category" required>
        <option v-for="category in categories" :key="category.category_id" :value="category.category_id">{{ category.name }}</option>
      </select>
      
      <label for="front_page">Imagen de Portada:</label>
      <input type="file" id="front_page" @change="handleFileUpload($event, 'front_page')" accept="image/*" required>
      
      <label for="file">Archivo de Video:</label>
      <input type="file" id="file" @change="handleFileUpload($event, 'file')" accept="video/*" required>
      
      <button type="submit">Registrar Película</button>
    </form>
  </div>
</template>

<script>
import { createMovie } from '../../services/movie';
import { fetchCategories } from '../../services/categories';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      movie: {
        title: '',
        description: '',
        length: 0,
        status: 'Activo',
        fk_category: '',
        front_page: null,
        file: null
      },
      categories: []
    };
  },
  async mounted() {
    this.categories = await fetchCategories();
  },
  methods: {
    async submitForm() {
      try {
        const createdMovie = await createMovie(this.movie);
        if (createdMovie) {
          Swal.fire({
            title: 'Éxito',
            text: 'Película registrada exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.resetForm();
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo registrar la película.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: `Error al registrar la película: ${error.message}`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    },
    resetForm() {
      this.movie = {
        title: '',
        description: '',
        length: 0,
        status: 'Activo',
        fk_category: '',
        front_page: null,
        file: null
      };
    },
    handleFileUpload(event, type) {
      const file = event.target.files[0];
      this.movie[type] = file;
    }
  }
};
</script>

<style scoped>
.main-container {
  background: #00050d;
  color: white;
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.movie-form {
  display: flex;
  flex-direction: column;
}

.movie-form label {
  margin-bottom: 10px;
  font-weight: bold;
}

.movie-form input,
.movie-form textarea,
.movie-form select {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.movie-form button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #1e90ff;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.movie-form button:hover {
  background-color: #1c86ee;
}
</style>
