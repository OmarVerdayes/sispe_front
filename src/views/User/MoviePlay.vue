<template>
  <div class="movie-play-container" @mousemove="handleMouseMove">
    <div v-if="loading" class="loading">
      <LoadAnimation />
    </div>
    <div v-else class="video-container">
      
        <button v-if="showButton" class="back-button" @click="handleBack"><b-icon icon="arrow-left" font-scale="2"></b-icon>
</button>
        <div v-if="isPaused && showOverlay" class="overlay">
        <h1 class="movie-title">{{ movie.title }}</h1>
        <p class="movie-description">{{ movie.description}}</p>
      </div>
      <video ref="videoPlayer" :src="movie.file" controls autoplay @pause="handlePause" @play="handlePlay" @fullscreenchange="handleFullscreenChange"></video>
    </div>
  </div>
</template>



<script>
import axios from 'axios';
import LoadAnimation from '../load/load.vue';

export default {
  components: {
    LoadAnimation,
  },
  data() {
    return {
      movie: {},
      loading: true,
      isPaused: false,
      showOverlay: true,
      mouseMoveTimeout: null,
      showButton: false,  // Nueva propiedad para mostrar el botón
      isFullscreen: false,
    };
  },
  created() {
    this.loadMovie();
  },
  methods: {
    async loadMovie() {
      this.loading = true;
      const filmId = this.$route.params.id;
      this.id_film = filmId;

      const authUser = JSON.parse(localStorage.getItem('authUser'));
      this.userId = authUser.user ? authUser.user.id.toUpperCase() : null;
      this.myEmail = authUser.user ? authUser.user.email : null;

      try {
        const commentsResponse = await axios.get(`https://vw5jvgq7hj.execute-api.us-east-1.amazonaws.com/Prod/ratings/${filmId}`);
        if (commentsResponse.data === "No rateings found for the given film") {
          this.listComments = [];
        } else {
          this.myComment = commentsResponse.data.find((comment) => comment.email === this.myEmail) || null;

          this.listComments = commentsResponse.data.filter((comment) => comment.email !== this.myEmail);
        }
      } catch (error) {
        console.error('Error al cargar los rateings:', error);
      }

      try {
        const response = await axios.get(`https://dld295hsy3.execute-api.us-east-1.amazonaws.com/Prod/films/category/${filmId}`);
        const data = response.data;

        this.movie = data.find((movie) => movie.film_id === filmId) || {};

        let lista = data.filter(movie => movie.film_id !== filmId);

        const filteredMovies = data.filter((movieI) => movieI.film_id !== filmId);
        this.suggested = filteredMovies;

      } catch (error) {
        console.error('Error al cargar la película:', error);
      } finally {
        this.loading = false;
      }

    },
    handlePause() {
      this.isPaused = true;
      this.showOverlay = true;
      this.showButton = true;

    },
    handlePlay() {
      this.isPaused = false;
      this.showOverlay = false;
      this.showButton = true;  
    },
    handleMouseMove() {
      if (this.isPaused) {
        this.showOverlay = false;
        this.showButton = true;

        clearTimeout(this.mouseMoveTimeout);
        this.mouseMoveTimeout = setTimeout(() => {
          this.showOverlay = true;
        }, 3000);
      }
    },
    handleFullscreenChange() {
      const videoElement = this.$refs.videoPlayer;
      if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        this.isFullscreen = true;
        this.showOverlay = true;
      } else {
        this.isFullscreen = false;
        this.showOverlay = false;
      }
    },
    handleBack() {
    this.$router.push({ name: 'movie-view', params: { id: this.$route.params.id } });
  }
  }
};
</script>

<style scoped>
html, body {
  overflow: hidden;
  height: 100%;
  margin: 0;
  padding: 0;
}
.movie-play-container {
  align-items: center;
  justify-content: center;
  height: 102vh;
  width: 100%;
  background-color: black;
  position: relative;
  overflow: hidden;
}

.video-container {
  width: 100%;
  height: 100%;
  max-width: 100vw;
  max-height: 100vh;
  position: relative; /* Asegura que los elementos dentro de este contenedor puedan ser posicionados absolutamente */

}

.video-container video {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

.overlay {
  position: absolute;
  bottom:0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 20px;
  z-index: 2;
}

.back-button {
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  display: flex;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  z-index: 2;
}

.movie-title {
  color: white;
  font-size: 80px;
  margin-top: 20px;
}
.movie-description {
  color: white;
  font-size: 17px;
  margin-bottom: 80px;
  max-width: 40%;
  height: auto;
  word-wrap: break-word; 
}
@media (max-width: 768px) {
  .movie-title {
    font-size: 8vw;
  }
  .movie-description {
    font-size: 5vw;
  }
}

@media (max-width: 480px) {
  .movie-title {
    font-size: 10vw;
  }
  .movie-description {
    font-size: 6vw;
  }
}
</style>