<template>
  <div class="main-container">
    <div class="container">
      <!-- Primer carrusel -->
      <vueper-slides class="no-shadow" :visible-slides="1" slide-multiple :slide-ratio="1 / 4" :gap="5"
        :arrows-outside="false">
        <vueper-slide v-for="(slide, i) in dataCarousel" :key="i" :image="slide.front_page">
        </vueper-slide>
      </vueper-slides>

      <!-- Segundo carrusel para cada categoría -->
      <div v-for="(films, category) in dataCarouselCategory" :key="category" class="category_div">
       
          <h2>{{ category }}</h2>
          <carousel-3d :width="300" :height="180" :display="5" :controls-visible="true" :controls-prev-html="'❮'"
            :controls-next-html="'❯'" :autoplay="true" :autoplay-timeout="5000" :autoplay-hover-pause="true" :border="0"
            :disable3d="true" :space="330">
            <slide v-for="(slide, i) in films" :index="i" :key="i" class="slide_category">
              <template #default="{ index, isCurrent, leftIndex, rightIndex }">
                <img :data-index="index"
                  :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }"
                  :src="slide.front_page" @click="navigateToMovie(slide.film_id)">
              </template>
            </slide>
          </carousel-3d>
          <br />



      </div>
    </div>
  </div>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';
import { VueperSlides, VueperSlide } from 'vueperslides';
import axios from 'axios';
import 'vueperslides/dist/vueperslides.css';

export default {
  components: {
    Carousel3d,
    Slide,
    VueperSlides,
    VueperSlide
  },
  data() {
    return {
      dataCarousel: [],
      dataCarouselCategory: {}
    };
  },
  methods: {
    navigateToMovie(filmId) {
      this.$router.push({ name: 'movie-view', params: { id: filmId } });
    },
    async fetchData() {
      try {
        const response = await axios.get('https://djpg1wqrj2.execute-api.us-east-1.amazonaws.com/Prod/films/random');
        this.dataCarousel = response.data;
      } catch (error) {
        console.error('Error fetching carousel data:', error);
      }
    },
    async fetchCategoryData() {
      try {
        const response = await axios.get('https://djpg1wqrj2.execute-api.us-east-1.amazonaws.com/Prod/films/list');
        this.dataCarouselCategory = response.data;
        console.log('Category data:', this.dataCarouselCategory);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    }
  },
  async created() {
    await this.fetchData();
    await this.fetchCategoryData();
  }
}
</script>

<style scoped>
html,
body {
  overflow-x: hidden;
  /* Evita el scroll horizontal */
  margin: 0;
  padding: 0;
}

.main-container {
  background: #00050d;
  width: 110vw;
  height: 350vh;
}
.container {
  padding: 10px;
  overflow-x: hidden;
}

.vueper-slides,
.carousel-3d {
  overflow-x: hidden;
}

.category_div {
  color: #ffffff;
}

.slide_category {
  display: flex;
  border-radius: 20px;
  box-shadow: 10px 10px 10px rgba(168, 168, 168, 0.161);
}
</style>
