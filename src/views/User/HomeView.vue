<template>
  <div class="main-container">
    <div class="container">
    <!--<vueper-slides
      fixed-height = "500px"
  :visible-slides="1"
  slide-multiple
  :slide-ratio="1 / 2.5"
  :gap="5"
  :arrows-outside="false"
  :bullets="false"
  :touchable = "false" 
>
  <vueper-slide 
    v-for="(slide, i) in dataCarousel" 
    :key="i" 
    :image="slide.front_page"
    class="custom-slide"
  >
  </vueper-slide>
</vueper-slides>-->

<carousel-3d 
  :width="1200" 
  :height="430" 
  :display="1" 
  :controls-visible="true"
  :autoplay="true" 
  :autoplay-timeout="2000" 
  :autoplay-hover-pause="true" 
  :border-radius="20"
  :disable3d="true" 
  :space="365"
  >
  <slide v-for="(slide, i) in dataCarousel" 
    :index="i" 
    :key="slide.film_id" 
    class="sle_category">
    <template #default="{ index, isCurrent, leftIndex, rightIndex }">
      <img 
        :data-index="index"
        :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }"
        :src="slide.front_page" 
        style="height:480px">
    </template>
  </slide>
</carousel-3d>
      <div v-for="(films, category) in dataCarouselCategory" :key="category" class="category_div">
          <h2>{{ category }}</h2>
          <carousel-3d :width="230" :height="130" :display="5" :controls-visible="true" :autoplay="true" :autoplay-timeout="2000" :autoplay-hover-pause="true" :border="0"
            :disable3d="true" :space="250">
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
import {byCategories} from '../../services/movie.js'
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
      const cachedData = localStorage.getItem('dataCarousel');
      if (cachedData) {
        this.dataCarousel = JSON.parse(cachedData);
      } else {
        const response = await axios.get('https://dld295hsy3.execute-api.us-east-1.amazonaws.com/Prod/films/random');
        this.dataCarousel = response.data;
        localStorage.setItem('dataCarousel', JSON.stringify(this.dataCarousel));
      }
    } catch (error) {
      console.error('Error fetching carousel data:', error);
    }
  },
  async byCategories() {
    try {
      const data = await byCategories();
      this.dataCarouselCategory = data; 
      console.log('Category data:', this.dataCarouselCategory);
    } catch(error) {
      console.error('Error fetching category data:', error);
    }
  },
},
async created() {
  await this.fetchData();
  await this.byCategories();
}

}
</script>

<style scoped>
html,
body {
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}
.vueperslides--fixed-height {  height :  500px ;  }
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
.vueperslide__image { 
  height: 100px;
} 
.slide_category {
  display: flex;
  border-radius: 20px;
}
</style>
