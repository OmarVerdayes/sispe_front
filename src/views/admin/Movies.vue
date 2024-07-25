<template>
  <div>
    <h1>Registro de Películas</h1>
    <form @submit.prevent="submitForm">
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
          console.log('Película registrada exitosamente:', createdMovie);
          this.resetForm();
        } else {
          console.error('No se pudo registrar la película.');
        }
      } catch (error) {
        console.error('Error al registrar la película:', error);
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

<style>
</style>
