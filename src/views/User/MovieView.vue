<template>
  <div class="movie-container">
    <div v-if="loading" class="loading-overlay">
      <LoadAnimation />
    </div>
    <div
      class="movie-banner"
      :style="{ backgroundImage: 'url(' + movie.front_page + ')' }"
    >
      <div class="overlay"></div>
      <div class="overlay-gradient"></div>
    </div>
    <div class="movie-details">
      <div class="details">
        <h1>{{ movie.title }}</h1>
        <p id="detail">2006 · Ciencia Ficción · {{ movie.length }} min</p>
        <p style="width: 700px"><strong></strong> {{ movie.description }}</p>
        <button @click="playMovie" class="play-button">
          <b-icon icon="play-fill" font-scale="1.3"></b-icon>
          Reproducir
        </button>
        <div class="heart-container" title="Like">
          <input type="checkbox" class="checkbox" id="Give-It-An-Id" />
          <div class="svg-container">
            <svg
              viewBox="0 0 24 24"
              class="svg-outline"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"
              ></path>
            </svg>
            <svg
              viewBox="0 0 24 24"
              class="svg-filled"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"
              ></path>
            </svg>
            <svg
              class="svg-celebrate"
              width="80"
              height="80"
              xmlns="http://www.w3.org/2000/svg"
            >
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
      <div v-if="showVideo" style="top: 0%">
        <video
          ref="videoPlayer"
          controls
          @ended="playMovie"
          :src="movie.file"
          style="width: 101vw; height: 100vh"
        ></video>
      </div>
      <div class="Suggested" style="margin-top: 200px">
        <h2>Sugerencias</h2>
        <hr class="divider" />
        <div class="suggested">
          <carousel-3d
            :width="250"
            :height="150"
            :display="7"
            :controls-visible="true"
            :autoplay="true"
            :autoplay-hover-pause="true"
            :border="0"
            :disable3d="true"
            :space="265"
          >
            <slide
              v-for="(slide, i) in suggested"
              :index="i"
              :key="slide.film_id"
              class="slide_category"
            >
              <template #default="{ index, isCurrent, leftIndex, rightIndex }">
                <img
                  :data-index="index"
                  :class="{
                    current: isCurrent,
                    onLeft: leftIndex >= 0,
                    onRight: rightIndex >= 0,
                  }"
                  :src="slide.front_page"
                  @click="navigateToMovie(slide.film_id)"
                />
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
            <b-card
              class="text-white"
              style="
                background-color: rgba(51, 51, 51, 0.7);
                border: none;
                max-width: 50%;
              "
              v-if="myComment"
            >
              <b-card-text>
                <div class="row align-items-center">
                  <div class="col-md-9">
                    <strong>User: </strong>{{ myComment.email }}
                  </div>
                  <div class="col-md-3 d-flex justify-content-end">
                    <span v-for="n in 5" :key="n" style="color: gold">
                      <b-icon
                        :icon="n <= myComment.grade ? 'star-fill' : 'star'"
                      />
                    </span>
                  </div>
                </div>
                <div style="font-size: large; margin: 10px">
                  {{ myComment.comment }}
                </div>
              </b-card-text>
            </b-card>
          </div>
          <div v-else class="rating">
            <span
              v-for="(star, index) in stars"
              :key="index"
              @mouseover="hoverRating(index + 1)"
              @click="setRating(index + 1)"
              @mouseleave="resetRating()"
              :class="{ filled: index < currentRating }"
              class="star"
            >
              &#9733;
            </span>
            <p>{{ currentRating }} de 5 estrellas</p>

            <div class="form-group">
              <textarea
                v-model="userComment"
                placeholder="Escribe tu comentario aquí..."
                class="textarea"
              ></textarea>
            </div>
            <button @click="submitComment" class="btn btn-primary">
              Enviar comentario
            </button>
          </div>
          <div class="container">
            <div class="row">
              <div
                v-if="listComments.length === 0 && myComment === null"
                class="col-12"
              >
                <p>
                  No hay opiniones para esta película, ¡sé el primero en opinar!
                </p>
              </div>
              <div
                v-else
                class="col-12 col-md-6 mb-4"
                v-for="comment in listComments"
                :key="comment.fk_user"
              >
                <b-card
                  class="text-white"
                  style="background-color: rgba(51, 51, 51, 0.7); border: none"
                >
                  <b-card-text>
                    <div class="row align-items-center">
                      <div class="col-md-8">
                        <strong>User: </strong>{{ comment.email }}
                      </div>
                      <div class="col-md-4 d-flex justify-content-end">
                        <span v-for="n in 5" :key="n" style="color: gold">
                          <b-icon
                            :icon="n <= comment.grade ? 'star-fill' : 'star'"
                          />
                        </span>
                      </div>
                    </div>
                    <div style="font-size: large; margin: 10px">
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
import axios from "axios";
import LoadAnimation from "../load/load.vue";

export default {
  components: {
    LoadAnimation,
  },
  data() {
    return {
      currentRating: 0,
      originalRating: 0,
      stars: [1, 2, 3, 4, 5],
      movie: {},
      suggested: [],
      listComments: [],
      userComment: "",
      id_film: "",
      userId: null,
      myEmail: null,
      myComment: null,
      loading: false,
      showVideo: false,
    };
  },
  created() {
    this.loadMovie();
  },
  methods: {
    hoverRating(rating) {
      this.originalRating = this.currentRating;
      this.currentRating = rating;
    },
    resetRating() {
      if (this.currentRating !== 0) return;
      this.currentRating = this.originalRating;
    },
    setRating(rating) {
      this.currentRating = rating;
      console.log("Calificación seleccionada:", this.currentRating);
    },
    async loadMovie() {
      this.loading = true;
      const filmId = this.$route.params.id;
      this.id_film = filmId;

      const authUser = JSON.parse(localStorage.getItem("authUser"));
      this.userId = authUser.user ? authUser.user.id.toUpperCase() : null;
      this.myEmail = authUser.user ? authUser.user.email : null;

      try {
        const commentsResponse = await axios.get(
          `https://vw5jvgq7hj.execute-api.us-east-1.amazonaws.com/Prod/ratings/${filmId}`
        );
        if (commentsResponse.data === "No rateings found for the given film") {
          this.listComments = [];
        } else {
          this.myComment =
            commentsResponse.data.find(
              (comment) => comment.email === this.myEmail
            ) || null;

          this.listComments = commentsResponse.data.filter(
            (comment) => comment.email !== this.myEmail
          );
        }
      } catch (error) {
        console.error("Error al cargar los rateings:", error);
      }

      try {
        const response = await axios.get(
          `https://dld295hsy3.execute-api.us-east-1.amazonaws.com/Prod/films/category/${filmId}`
        );
        const data = response.data;

        this.movie = data.find((movie) => movie.film_id === filmId) || {};

        let lista = data.filter((movie) => movie.film_id !== filmId);

        const filteredMovies = data.filter(
          (movieI) => movieI.film_id !== filmId
        );
        this.suggested = filteredMovies;
      } catch (error) {
        console.error("Error al cargar la película:", error);
      } finally {
        this.loading = false;
      }
    },
    playMovie() {
      this.$router.push({
        name: "moviePlay",
        params: { id: this.id_film },
      });
    },
    /*playMovie() {
      this.showVideo = true;
      this.$nextTick(() => {
        const videoElement = this.$refs.videoPlayer;
        videoElement.play();
            videoElement.controls = false;
        if (videoElement.requestFullscreen) {
          videoElement.requestFullscreen();
          videoElement.controls = false;
        } else if (videoElement.mozRequestFullScreen) {
          videoElement.mozRequestFullScreen();
          videoElement.controls = false;
        } else if (videoElement.webkitRequestFullscreen) { 
          videoElement.webkitRequestFullscreen();
          videoElement.controls = false;
        } else if (videoElement.msRequestFullscreen) {
          videoElement.msRequestFullscreen();
          videoElement.controls = false;

        }
      });
    },*/
    /*exitFullScreen() {
      const videoElement = this.$refs.videoPlayer;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari 
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
      videoElement.pause(); // Pausar el video
      this.showVideo = false;
    },*/
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
      if (this.currentRating === 0 || this.userComment.trim() === "") {
        alert(
          "Por favor, selecciona una calificación y escribe un comentario."
        );
        return;
      }

      if (
        this.currentRating &&
        this.userComment &&
        this.userId &&
        this.id_film
      ) {
        const data = {
          grade: this.currentRating,
          comment: this.userComment,
          fk_user: this.userId,
          fk_film: this.id_film,
        };
        try {
          const response = await axios.post(
            `https://vw5jvgq7hj.execute-api.us-east-1.amazonaws.com/Prod/rating/`,
            data
          );
          this.myComment = data;
          alert("Comentario creado.");
        } catch (error) {
          console.log("error al registrar el comentario: ", error);
        }
      }
    },
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
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
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
  background: linear-gradient(
    to top right,
    rgb(0, 0, 0),
    rgba(0, 0, 0, 0.141) 80%
  );
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
.fullscreen-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 9999;
}
.heart-container {
  --heart-color: rgb(255, 91, 137);
  position: relative;
  width: 40px;
  height: 40px;
  transition: 0.3s;
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
  animation: keyframes-svg-celebrate 0.5s;
  animation-fill-mode: forwards;
  display: none;
  stroke: var(--heart-color);
  fill: var(--heart-color);
  stroke-width: 2px;
}

.heart-container .checkbox:checked ~ .svg-container .svg-filled {
  display: block;
}

.heart-container .checkbox:checked ~ .svg-container .svg-celebrate {
  display: block;
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
</style>
