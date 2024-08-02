<template>
  <div class="movie-container">
    <div class="movie-banner" :style="{ backgroundImage: 'url(' + movie.front_page + ')' }">
      <div class="overlay"></div>
      <div class="overlay-gradient"></div>
    </div>
    <div class="movie-details">
      <div class="details">
        <h1>{{ movie.title }}</h1>
        <p id="detail">2006 · Ciencia Ficción · {{ movie.length }} min</p>
        <p style="width: 700px"><strong></strong> {{ movie.description }}</p>
        <button @click="goBack" class="play-button">
          <b-icon icon="play-fill" font-scale="1.3"></b-icon>
          Reproducir
        </button>
        <button @click="goBack" class="trailer-button">
          Tráiler
        </button>
        <button @click="goBack" class="favorite-button">
          <b-icon icon="star" font-scale="1.3"></b-icon>
        </button>
      </div>
      <div class="Suggested" style="margin-top: 200px">
        <h2>Sugerencias</h2>
        <hr class="divider" style="margin-top: 0px" />
        <div class="suggested">
          <carousel-3d :width="250" :height="150" :display="7" :controls-visible="true" :controls-prev-html="'❮'"
            :controls-next-html="'❯'" :autoplay="true" :autoplay-timeout="5000" :autoplay-hover-pause="true" :border="0"
            :disable3d="true" :space="265">
            <slide v-for="(slide, i) in suggested" :index="i" :key="i" class="slide_category">
              <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
                <img :data-index="index" :class="{
                  current: isCurrent,
                  onLeft: leftIndex >= 0,
                  onRight: rightIndex >= 0,
                }" :src="slide.front_page" @click="navigateToMovie(slide.film_id)" />
              </template>
            </slide>
          </carousel-3d>
          <br />
        </div>
      </div>
      <div>
        <div class="tabs" fill>
          <h2>Calificaciones</h2>
        </div>
        <hr class="divider" style="margin-top: 0px" />
        <div>
          <h3>Mi calificación</h3>
          <div v-if="myComment" class="rating">
            <b-card class="text-white" style="background-color: rgba(51, 51, 51, 0.7); border: none; max-width: 50%;"
              v-if="myComment">
              <b-card-text>
                <div class="row align-items-center">
                  <div class="col-md-9">
                    <strong>User: </strong>{{ myComment.email }}
                  </div>
                  <div class="col-md-3 d-flex justify-content-end">
                    <span v-for="n in 5" :key="n" style="color: gold;">
                      <b-icon :icon="n <= myComment.grade ? 'star-fill' : 'star'" />
                    </span>
                  </div>
                </div>
                <div style="font-size: large; margin: 10px;">
                  {{ myComment.comment }}
                </div>
              </b-card-text>
            </b-card>

          </div>
          <div v-else class="rating">
            <!-- Mostrar el formulario de calificación si myComment es null -->
            <span v-for="(star, index) in stars" :key="index" @mouseover="hoverRating(index + 1)"
              @click="setRating(index + 1)" @mouseleave="resetRating()" :class="{ 'filled': index < currentRating }"
              class="star">
              &#9733;
            </span>
            <p>{{ currentRating }} de 5 estrellas</p>

            <div class="form-group">
              <textarea v-model="userComment" placeholder="Escribe tu comentario aquí..." class="textarea"></textarea>
            </div>
            <button @click="submitComment" class="btn btn-primary">Enviar comentario</button>
          </div>
          <div class="container">
            <div class="row">
              <div v-if="listComments.length === 0 && myComment===null" class="col-12">
                <p>No hay opiniones para esta película, ¡sé el primero en opinar!</p>
              </div>
              <div v-else class="col-12 col-md-6 mb-4" v-for="comment in listComments" :key="comment.fk_user">
                <b-card class="text-white" style="background-color: rgba(51, 51, 51, 0.7); border: none;">
                  <b-card-text>
                    <div class="row align-items-center">
                      <div class="col-md-8">
                        <strong>User: </strong>{{ comment.email }}
                      </div>
                      <div class="col-md-4 d-flex justify-content-end">
                        <span v-for="n in 5" :key="n" style="color: gold;">
                          <b-icon :icon="n <= comment.grade ? 'star-fill' : 'star'" />
                        </span>
                      </div>
                    </div>
                    <div style="font-size: large; margin: 10px;">
                      {{ comment.comment }}
                    </div>
                  </b-card-text>
                </b-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentRating: 0,
      originalRating: 0, // Almacena la calificación original
      stars: [1, 2, 3, 4, 5],
      movie: {},
      suggested: [],
      listComments: [],
      userComment: '',
      id_film: '',
      userId: null,
      myEmail: null,
      myComment: null
    };
  },
  created() {
    this.loadMovie();
  },
  methods: {
    hoverRating(rating) {
      this.originalRating = this.currentRating; // Guarda la calificación original
      this.currentRating = rating;
    },
    resetRating() {
      // Solo restablecer la calificación a la original cuando no esté seleccionada
      if (this.currentRating !== 0) return;
      this.currentRating = this.originalRating; // Restablece a la calificación original
    },
    setRating(rating) {
      this.currentRating = rating;
      console.log('Calificación seleccionada:', this.currentRating); // Verificar si se actualiza correctamente
    },
    async loadMovie() {
      const filmId = this.$route.params.id;
      this.id_film = filmId;

      const authUser = JSON.parse(localStorage.getItem('authUser'));
      this.userId = authUser.user ? authUser.user.id.toUpperCase() : null;
      this.myEmail = authUser.user ? authUser.user.email : null;

      try {
        const commentsResponse = await axios.get(`https://1yasnjn821.execute-api.us-east-1.amazonaws.com/Prod/get_rateing_by_film_id/${filmId}`);
        if (commentsResponse.data === "No rateings found for the given film") {
          this.listComments = [];
        } else {
          this.myComment = commentsResponse.data.find((comment) => comment.email === this.myEmail) || null;

          this.listComments = commentsResponse.data.filter((comment) => comment.email !== this.myEmail);
          //this.listComments = commentsResponse.data;
        }
      } catch (error) {
        console.error('Error al cargar los rateings:', error);
      }


      try {
        const response = await axios.get(`https://djpg1wqrj2.execute-api.us-east-1.amazonaws.com/Prod/get_category_films_by_film_id/${filmId}`);
        const data = response.data;

        this.movie = data.find((movie) => movie.film_id === filmId) || {};

        const filteredMovies = data.filter((movieI) => movieI.film_id !== filmId);
        this.suggested = filteredMovies;

      } catch (error) {
        console.error('Error al cargar la película:', error);
      }

    },
    goBack() {
      this.$router.push({ name: "home" });
    },
    handleScroll() {
      const scrollPosition = window.scrollY;
      const overlay = document.querySelector(".overlay");
      if (overlay) {
        overlay.style.opacity = `${Math.min(scrollPosition / 500, 0.8)}`;
      }
    },
    async submitComment() {
      if (this.currentRating === 0 || this.userComment.trim() === '') {
        alert('Por favor, selecciona una calificación y escribe un comentario.');
        return;
      }

      if (this.currentRating && this.userComment && this.userId && this.id_film) {
        const data = {
          "grade": this.currentRating,
          "comment": this.userComment,
          "fk_user": this.userId,
          "fk_film": this.id_film
        }
        try {
          const response = await axios.post(`https://1yasnjn821.execute-api.us-east-1.amazonaws.com/Prod/rateing/`, data);
          this.myComment = data;
          alert('Comentario creado.');
        } catch (error) {
          console.log('error al registrar el comentario: ', error);
        }
      }
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style>
.movie-container {
  background: #061523;
  color: #ffffff;
  text-align: center;
  padding-top: 10vh;
}

.movie-banner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(9, 9, 9);
  opacity: 100px;
  pointer-events: none;
  transition: opacity 0.1s ease;
}

#detail {
  margin: 5px 0;
  line-height: 1.5;
  font-size: 0.9em;
  color: #808080;
}

.movie-details {
  position: relative;
  z-index: 1;
  padding: 20px;
  text-align: left;
  padding: 50px;
}

.movie-details h1 {
  margin-bottom: 10px;
}

.movie-details p {
  margin: 5px 0;
  line-height: 1.5;
  font-size: 1.1em;
  color: #ffffff;
}

.play-button {
  display: inline-block;
  padding: 13px 30px;
  margin-top: 20px;
  background: #f5f5f5;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-size: 1em;
  transition: background 0.3s;
}

.play-button:hover {
  background: #061527;
  color: #ffffff;
}

.trailer-button {
  display: inline-block;
  padding: 13px 30px;
  margin-top: 30px;
  margin-left: 15px;
  background: #ffffff50;
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-size: 1em;
  transition: background 0.3s;
}

.trailer-button:hover {
  background: rgba(255, 255, 255, 0.576);
  color: #ffffff;
}

.favorite-button {
  display: inline-block;
  padding: 13px 30px;
  margin-top: 30px;
  margin-left: 15px;
  background: #ffffff50;
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-size: 1em;
  transition: background 0.3s;
}

.favorite-button:hover {
  background: rgba(255, 255, 255, 0.576);
  color: #ffffff;
}

.overlay-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top right,
      rgb(0, 0, 0),
      rgba(0, 0, 0, 0.141) 80%);
  pointer-events: none;
}

.slide {
  display: flex;
}

.slide_category {
  display: flex;
  border-radius: 15px;
}

.tabs {
  /* display: flex;
  justify-content: center; */
  margin-bottom: 10px;
}

.rating {
  width: 100%;
  display: inline-block;
  font-size: 24px;
}

.star {
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s;
}

.star.filled {
  color: orange;
}

.textarea {
  width: 50%;
  max-width: 600px;
  height: 150px;
  max-height: 200px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
}
</style>
