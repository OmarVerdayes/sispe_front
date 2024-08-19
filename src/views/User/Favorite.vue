<template>
  <div class="about">
    <div class="title-content">
      <h1 class="title">Mi lista</h1>
    </div>
    <div class="favorites-list">
      <LoadAnimation v-if="loading" />
      <div v-else-if="favorites.length === 0" class="no-favorites">
        No tienes películas favoritas.
      </div>
      <div v-else class="movies">
        <div v-for="movie in favorites" :key="movie.film_id" class="movie-item">
          <img :src="movie.front_page" style="width:250px ; height:150px" alt="Poster" class="movie-poster" />
          <h3 class="movie-title">{{ movie.title }}</h3>
          <div class="heart-container" title="Like">
            <input type="checkbox" class="checkbox" id="Give-It-An-Id">
            <div class="svg-container">
                <svg viewBox="0 0 24 24" class="svg-outline" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                    </path>
                </svg>
                <svg viewBox="0 0 24 24" class="svg-filled" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                    </path>
                </svg>
                <svg class="svg-celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="10,10 20,20"></polygon>
                    <polygon points="10,50 20,50"></polygon>
                    <polygon points="20,80 30,70"></polygon>
                    <polygon points="90,10 80,20"></polygon>
                    <polygon points="90,50 80,50"></polygon>
                    <polygon points="80,80 70,70"></polygon>
                </svg>
            </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import LoadAnimation from '../load/load.vue';
import Swal from 'sweetalert2';

export default {
  components: {
    LoadAnimation,
  },
  data() {
    return {
      favorites: [],
      loading: true,
    };
  },
  created() {
    this.loadFavorites();
  },
  methods: {
    async loadFavorites() {
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      const userId = authUser.user ? authUser.user.id.toUpperCase() : null;

      if (!userId) {
        this.loading = false;
        return;
      }

      try {
        const response = await axios.get(
          `https://qhl0fcehdg.execute-api.us-east-1.amazonaws.com/Prod/favorites/${userId}`
        );
        this.favorites = response.data;

        Swal.fire({
          title: 'Éxito',
          text: 'Lista de favoritos cargada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      } catch (error) {
        console.error("Error al cargar la lista de favoritos:", error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo cargar la lista de favoritos.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.heart-container {
  --heart-color: rgb(255, 91, 137);
  position: relative;
  width: 50px;
  height: 50px;
  transition: .3s;
}

.heart-container .checkbox {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 20;
  cursor: pointer;
}

.heart-container .svg-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.heart-container .svg-outline,
        .heart-container .svg-filled {
  fill: var(--heart-color);
  position: absolute;
}

.heart-container .svg-filled {
  animation: keyframes-svg-filled 1s;
  display: none;
}

.heart-container .svg-celebrate {
  position: absolute;
  animation: keyframes-svg-celebrate .5s;
  animation-fill-mode: forwards;
  display: none;
  stroke: var(--heart-color);
  fill: var(--heart-color);
  stroke-width: 2px;
}

.heart-container .checkbox:checked~.svg-container .svg-filled {
  display: block
}

.heart-container .checkbox:checked~.svg-container .svg-celebrate {
  display: block
}

@keyframes keyframes-svg-filled {
  0% {
    transform: scale(0);
  }

  25% {
    transform: scale(1.2);
  }

  50% {
    transform: scale(1);
    filter: brightness(1.5);
  }
}

@keyframes keyframes-svg-celebrate {
  0% {
    transform: scale(0);
  }

  50% {
    opacity: 1;
    filter: brightness(1.5);
  }

  100% {
    transform: scale(1.4);
    opacity: 0;
    display: none;
  }
}
.about {
  background-color: #00050D;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  color: white;
}

.favorites-list {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.no-favorites {
  color: white;
}

.movies {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.movie-item {
  background-color: #1a1a1a;
  border-radius: 10px;
  padding: 15px;
  width: 300px;
  text-align: center;
  color: white;
}

.movie-poster {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.movie-title {
  margin-top: 10px;
  font-size: 18px;
}

.movie-description {
  margin-top: 5px;
  font-size: 14px;
  color: #ccc;
}
</style>
