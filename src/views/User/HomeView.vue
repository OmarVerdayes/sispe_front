<template>
  <div class="main-container">
    <div class="container">
      <vueper-slides
        class="no-shadow"
        :visible-slides="1"
        slide-multiple
        :slide-ratio="1 / 4"
        :gap="5"
        :arrows-outside="false"
      >
        <vueper-slide
          v-for="(slide, i) in dataCarousel"
          :key="i"
          :image="slide.front_page"
        >
        </vueper-slide>
      </vueper-slides>
      <div
        v-for="(films, category) in filmCategories"
        :key="category"
        class="category_div"
      >
        <h2>{{ category }}</h2>
        <v-sheet width="150%" style="background: transparent">
          <v-carousel height="200" hide-delimiters>
            <v-carousel-item
              v-for="(group, index) in groupedFilms[category]"
              :key="index"
            >
              <v-row>
                <v-col v-for="film in group" :key="film.film_id" cols="2">
                  <v-card
                    class="film-card"
                    height="250px"
                    style="border-radius: 30px; background: transparent"
                    @click="navigateToMovie(film.film_id)"
                  >
                    <v-img :src="film.front_page" class="film-img" />
                  </v-card>
                </v-col>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-sheet>
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  components: {
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      filmCategories: {},
      groupedFilms: {},
    };
  },
  methods: {
    navigateToMovie(filmId) {
      this.$router.push({ name: "movie-view", params: { id: filmId } });
    },
    async fetchFilmData() {
      try {
        const response = await axios.get(
          "https://djpg1wqrj2.execute-api.us-east-1.amazonaws.com/Prod/films/list"
        );
        this.filmCategories = response.data;
        this.groupedFilms = this.groupFilms(this.filmCategories);
      } catch (error) {
        console.error("Error fetching film data:", error);
      }
    },
    groupFilms(filmCategories) {
      const grouped = {};
      for (const [category, films] of Object.entries(filmCategories)) {
        grouped[category] = [];
        for (let i = 0; i < films.length; i += 6) {
          grouped[category].push(films.slice(i, i + 6));
        }
      }
      return grouped;
    },
  },
  created() {
    this.fetchFilmData();
  },
};
</script>
  
  <style>
.main-container {
  background: #00050d;
  overflow: hidden;
  width: 120vw;
  height: 350vh;
}

.container {
  padding: 10px;
}

.category_div {
  color: #ffffff;
  margin-bottom: 20px;
}

.film-card {
  background: transparent;
}

.film-img {
  height: 70%;
  box-shadow: 10px 10px 10px rgba(168, 168, 168, 0.161);

}

.v-carousel-item {
  background: transparent;
}
</style>
  