<template>
  <div class="movie-search">
    <input type="text" v-model="searchQuery" @input="handleSearch" placeholder="Título, Género y más." class="search-input">
  
    <div class="movies-container">
      <div class="movie-row" v-for="(row, index) in paginatedRows" :key="index">
        <div class="movie-card" v-for="movie in row" :key="movie.film_id">
          <div class="movie-image-wrapper">
            <img :src="movie.banner" alt="Portada de la película" width="180">
          </div>
          <h2>{{ movie.title }}</h2>
        </div>
      </div>
      <div v-if="filteredMovies.length === 0 && !loading">
        <p>No se encontraron películas.</p>
      </div>
      <p v-if="loading">Cargando...</p>
    </div>
  </div>
</template>

<script>
import { fetchMovies } from '../../services/movie.js';

export default {
  data() {
    return {
      movies: [],
      loading: false,
      itemsPerPage: 5,
      currentPage: 1,
      searchQuery: ''
    };
  },
  computed: {
    filteredMovies() {
      if (this.searchQuery.trim() === '') {
        return this.movies;
      } else {
        const query = this.searchQuery.trim().toLowerCase();
        return this.movies.filter(movie =>
          movie.title.toLowerCase().includes(query));
      }
    },
    paginatedRows() {
      const rows = [];
      let row = [];
      this.filteredMovies.forEach((movie, index) => {
        if (index > 0 && index % this.itemsPerPage === 0) {
          rows.push(row);
          row = [];
        }
        row.push(movie);
      });
      if (row.length > 0) {
        rows.push(row);
      }
      return rows;
    },
    totalPages() {
      return Math.ceil(this.filteredMovies.length / this.itemsPerPage);
    }
  },
  mounted() {
    this.fetchMovies(); 
    window.addEventListener('resize', this.handleResize);
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    async fetchMovies() {
      this.loading = true;
      try {
        const data = await fetchMovies();
        this.movies = data; 
      } finally {
        this.loading = false;
      }
    },
    handleSearch() {
      this.currentPage = 1; 
    },
    handleResize() {
    }
  }
};
</script>

<style scoped>
.movie-search {
  background-color: #00050D;
  padding: 20px;
  color: white;
  min-height: 100vh;
}

.search-input {
  margin: 20px;
  font-size: 30px;
  width: 600px;
  padding: 10px;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  margin-bottom: 20px;
}

.movies-container {
  margin: 20px;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.movie-row {
  width: 100%;
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-between;
  margin-bottom: 20px;
}

.movie-card {
  width: calc(20% - 20px);
  margin-bottom: 20px;
  padding: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 350px;
}

.movie-card img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.movie-card h2 {
  color: white;
  margin-top: 10px;
}

@media (max-width: 1200px) {
  .movie-card {
    width: calc(25% - 20px);
  }
}

@media (max-width: 992px) {
  .movie-card {
    width: calc(33.33% - 20px); 
  }
}

@media (max-width: 768px) {
  .movie-card {
    width: calc(50% - 20px);
  }
}
</style>
