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
          <b-icon icon="play-fill
" font-scale="1.3"></b-icon>
          Reproducir
        </button>
        <button @click="goBack" class="trailer-button">
          Tráiler
        </button>
        <button @click="goBack" class="favorite-button">
          <b-icon icon="star
" font-scale="1.3"></b-icon>
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
          <div class="rating">
            <span v-for="(star, index) in stars" :key="index" @mouseover="hoverRating(index + 1)"
              @click="setRating(index + 1)" @mouseleave="resetRating()" :class="{ 'filled': index < currentRating }"
              class="star">
              &#9733;
            </span>
            <p>{{ currentRating }} de 5 estrellas</p>

            <div class="container">
              <div class="row">
                <div class="col-12 col-md-6 mb-4" v-for="comment in listComments" :key="comment.fk_user">
                  <b-card class=" text-white" style="background-color: rgba(51, 51, 51, 0.7); border: none;">
                    <b-card-text>
                      <div class="row align-items-center">
                        <div class="col-md-8">
                          <strong>User: </strong>{{ comment.rateing_id }}
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRating: 0,
      stars: [1, 2, 3, 4, 5],
      movie: {},
      suggested: [
        {
          film_id: "00112233445566778899aabbccddeeff",
          title: "The Great Adventure",
          description: "An epic journey through uncharted lands.",
          length: 120.5,
          status: "Activo",
          fk_category: "ffddeeaabbcc99887766554433221100",
          front_page:
            "https://img.asmedia.epimg.net/resizer/v2/5IVIDTIFJJF4FPVSPNTCL42EVE.jpg?auth=0dc9e916d1b4e5dc8362d3f9e02421b3ff523727d0d5b5b7389fdb11cb1c96e0&width=1472&height=1104&smart=true",
          file: "http://example.com/files/the_great_adventure.mp4",
        },
        {
          film_id: "11223344556677889900aabbccddeeff",
          title: "Mystery of the Lost City",
          description:
            "A thrilling tale of ancient secrets and hidden treasures.",
          length: 95.75,
          status: "Activo",
          fk_category: "eeddccbbaa99887766554433221100ff",
          front_page:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4mpt46Iuk6Pr-a4heOg1k6o3KJRGo57tE1Q&s",
          file: "http://example.com/files/mystery_of_the_lost_city.mp4",
        },
        {
          film_id: "223344556677889900aabbccddeeff00",
          title: "Romance in the Rain",
          description:
            "A love story that blossoms in the heart of a rainy city.",
          length: 110.0,
          status: "Inactivo",
          fk_category: "ccddeeaa99887766554433221100ffbb",
          front_page: "https://i.blogs.es/c7ed10/screenshot_90/1366_2000.jpeg",
          file: "http://example.com/files/romance_in_the_rain.mp4",
        },
        {
          film_id: "3344556677889900aabbccddeeff0011",
          title: "Space Odyssey",
          description: "A groundbreaking sci-fi adventure across the universe.",
          length: 150.25,
          status: "Activo",
          fk_category: "bbaadd99887766554433221100ffeedd",
          front_page:
            "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/DB176BD1488D7E4822256EF1778C124FC17388FC1E7F0F6D89B38AFF5FB001F6/scale?width=1200&amp;aspectRatio=1.78&amp;format=webp",
          file: "http://example.com/files/space_odyssey.mp4",
        },
        {
          film_id: "44556677889900aabbccddeeff001122",
          title: "The Secret Garden",
          description: "Discover the hidden wonders of a forgotten garden.",
          length: 115.75,
          status: "Activo",
          fk_category: "ffddeeaabbcc99887766554433221100",
          front_page:
            "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/713EAC98B3CEC6A774A84243AD1FA532576F243B8A152FEA0C03C4E32BBFE018/scale?width=1200&aspectRatio=1.78&format=webp",
          file: "http://example.com/files/the_secret_garden.mp4",
        },
        {
          film_id: "556677889900aabbccddeeff00112233",
          title: "Jurassic Adventure",
          description: "An expedition into the world of dinosaurs.",
          length: 130.0,
          status: "Activo",
          fk_category: "eeddccbbaa99887766554433221100ff",
          front_page:
            "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/04/keanu-reeves-saga-john-wick-3010958.jpg?tf=3840x",
          file: "http://example.com/files/jurassic_adventure.mp4",
        },
        {
          film_id: "6677889900aabbccddeeff0011223344",
          title: "The Phantom Manor",
          description: "Explore the eerie secrets of a haunted mansion.",
          length: 105.5,
          status: "Inactivo",
          fk_category: "ccddeeaa99887766554433221100ffbb",
          front_page:
            "https://todoaccion.com/wp-content/uploads/2023/09/La-Monja-2-personaje-monja-Todo-Accion-1080x675.jpg",
          file: "http://example.com/files/phantom_manor.mp4",
        },
        {
          film_id: "77889900aabbccddeeff001122334455",
          title: "Underwater Odyssey",
          description:
            "Journey to the depths of the ocean in search of lost treasures.",
          length: 140.25,
          status: "Activo",
          fk_category: "bbaadd99887766554433221100ffeedd",
          front_page:
            "https://arteycultura.com.mx/wp-content/uploads/2014/11/interestelar.jpg",
          file: "http://example.com/files/underwater_odyssey.mp4",
        },
      ],
      listComments: [
        {
          "rateing_id": "e8b08f9b50b141c7b3a30720a2a5b7a1",
          "grade": 4.5,
          "comment": "¡Gran película, realmente la disfruté!",
          "fk_user": "12c1af3b91e14184a4a8cfc2b89f1ed9",
          "fk_film": "53c2ff1b61e14523b9e7b762d6d9a8f1"
        },
        {
          "rateing_id": "d4c4f9bb90e7417cb2c62d22a4b4b3d3",
          "grade": 3.2,
          "comment": "Estuvo bien, podría haber sido mejor.",
          "fk_user": "a6b2df4e83d84283a4a5b0b1c4f2d4c7",
          "fk_film": "74d3ee2c53d84523b8d9c7d7e6e1a9e2"
        },
        {
          "rateing_id": "f1a3d8e9c1b44172a4e7d7b4c3a5b6a7",
          "grade": 5.0,
          "comment": "¡Absolutamente fantástica! Imprescindible.",
          "fk_user": "b3e2d9f4a1c94163a5d7b7d7d6d2b1f3",
          "fk_film": "e4a2b9d1f3e64528b8a7c7f7d6d1e2a3"
        },
        {
          "rateing_id": "a2e3f4d5c1b2417eb8a6b2b1c4d3d4e5",
          "grade": 2.8,
          "comment": "No es mi estilo.",
          "fk_user": "c2b1d7f4e3a84175a4d2b2c3d4e3f1b2",
          "fk_film": "d3c2e4b5a1f74268b6c7d7f7d6e2e3c1"
        },
        {
          "rateing_id": "c5d4e2a1b4c74179b3d6b2a1e3f2d4a5",
          "grade": 4.0,
          "comment": "Muy entretenida y bien hecha.",
          "fk_user": "d1e2c3f4b3a74167a5d2c3e4d1f3a2b3",
          "fk_film": "c6b5d7e3a2e84769b5d6e7f7d6d1c2b4"
        }
      ]
    };
  },
  created() {
    this.loadMovie();
  },
  methods: {
    hoverRating(rating) {
      this.currentRating = rating;
    },
    resetRating() {
      if (this.currentRating === 0) return;
      this.currentRating = 0;
    },
    setRating(rating) {
      this.currentRating = rating;
      this.$emit('rated', rating);
    },
    loadMovie() {
      const filmId = this.$route.params.id;
      const movies = [
        {
          film_id: "00112233445566778899aabbccddeeff",
          title: "The Great Adventure",
          description: "An epic journey through uncharted lands.",
          length: 120.5,
          status: "Activo",
          fk_category: "ffddeeaabbcc99887766554433221100",
          front_page:
            "https://img.asmedia.epimg.net/resizer/v2/5IVIDTIFJJF4FPVSPNTCL42EVE.jpg?auth=0dc9e916d1b4e5dc8362d3f9e02421b3ff523727d0d5b5b7389fdb11cb1c96e0&width=1472&height=1104&smart=true",
          file: "http://example.com/files/the_great_adventure.mp4",
        },
        {
          film_id: "11223344556677889900aabbccddeeff",
          title: "Entrenando a mi dragon",
          description:
            "A thrilling tale of ancient secrets and hidden treasures.",
          length: 95.75,
          status: "Activo",
          fk_category: "eeddccbbaa99887766554433221100ff",
          front_page:
            "https://media.glamour.mx/photos/6477bfe1af12f5514d139ef3/16:9/w_1600,c_limit/IMG_6625.jpeg",
          file: "http://example.com/files/mystery_of_the_lost_city.mp4",
        },
        {
          film_id: "223344556677889900aabbccddeeff00",
          title: "Spider-Man",
          description:
            " La historia sigue a Peter Parker, un estudiante de secundaria que adquiere poderes arácnidos tras ser picado por una araña radiactiva. ",
          length: 110.0,
          status: "Inactivo",
          fk_category: "ccddeeaa99887766554433221100ffbb",
          front_page: "https://i.blogs.es/c7ed10/screenshot_90/1366_2000.jpeg",
          file: "http://example.com/files/romance_in_the_rain.mp4",
        },
        {
          film_id: "3344556677889900aabbccddeeff0011",
          title: "Avengers - EndGame",
          description: "La trama sigue a los Vengadores restantes mientras intentan revertir el daño causado por Thanos, quien erradicó a la mitad del universo al chasquear sus dedos con las Gemas del Infinito en Avengers: Infinity War",
          length: 150.25,
          status: "Activo",
          fk_category: "bbaadd99887766554433221100ffeedd",
          front_page:
            "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/DB176BD1488D7E4822256EF1778C124FC17388FC1E7F0F6D89B38AFF5FB001F6/scale?width=1200&amp;aspectRatio=1.78&amp;format=webp",
          file: "http://example.com/files/space_odyssey.mp4",
        },
        {
          film_id: "44556677889900aabbccddeeff001122",
          title: "Avatar",
          description: "Ambientada en el planeta Pandora, sigue a Jake Sully, un exmarine parapléjico que participa en un programa que lo conecta con un avatar Na'vi, una raza indígena humanoides",
          length: 115.75,
          status: "Activo",
          fk_category: "ffddeeaabbcc99887766554433221100",
          front_page:
            "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/713EAC98B3CEC6A774A84243AD1FA532576F243B8A152FEA0C03C4E32BBFE018/scale?width=1200&aspectRatio=1.78&format=webp",
          file: "http://example.com/files/the_secret_garden.mp4",
        },
        {
          film_id: "556677889900aabbccddeeff00112233",
          title: "John Wick",
          description: "Wick, devastado por la pérdida de su esposa, se ve obligado a regresar al mundo del crimen después de que un grupo de gángsters rusos roba su automóvil y mata a su perro, el último regalo de su difunta esposa",
          length: 130.0,
          status: "Activo",
          fk_category: "eeddccbbaa99887766554433221100ff",
          front_page:
            "https://mx.web.img3.acsta.net/r_654_368/newsv7/19/05/16/21/51/0744636.jpg",
          file: "http://example.com/files/jurassic_adventure.mp4",
        },
        {
          film_id: "6677889900aabbccddeeff0011223344",
          title: "La Monja",
          description:
            "Un sacerdote y una novicia enviados por el Vaticano para investigar el suicidio de una monja en un convento en Rumania en 1952. Descubren secretos oscuros y se enfrentan al demonio Valak, que adopta la forma de una monja para aterrorizarlos.",
          length: 105.5,
          status: "Inactivo",
          fk_category: "ccddeeaa99887766554433221100ffbb",
          front_page:
            "https://todoaccion.com/wp-content/uploads/2023/09/La-Monja-2-personaje-monja-Todo-Accion-1080x675.jpg",
          file: "http://example.com/files/phantom_manor.mp4",
        },
        {
          film_id: "77889900aabbccddeeff001122334455",
          title: "Interestelar",
          description:
            "Un grupo de exploradores que viajan a través de un agujero de gusano en busca de un nuevo hogar para la humanidad, amenazada por la escasez de recursos en la Tierra. ",
          length: 140.25,
          status: "Activo",
          fk_category: "bbaadd99887766554433221100ffeedd",
          front_page:
            "https://arteycultura.com.mx/wp-content/uploads/2014/11/interestelar.jpg",
          file: "http://example.com/files/underwater_odyssey.mp4",
        },

      ];
      this.movie = movies.find((movie) => movie.film_id === filmId) || {};
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
</style>
