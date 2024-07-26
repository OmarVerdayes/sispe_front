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
  
        <div class="category_div">
            <h2>Nombre de la categoria 1</h2>
            <carousel-3d :width="250" :height="130" :display="7" :controls-visible="true" :controls-prev-html="'❮'"
                :controls-next-html="'❯'" :autoplay="true" :autoplay-timeout="5000" :autoplay-hover-pause="true"
                :border="0" :disable3d="true" :space="265">
                <slide v-for="(slide, i) in dataCarouselCategory" :index="i" :key="i"  class="slide_category">
                    <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
                        <img :data-index="index"
                            :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }"
                            :src="slide.front_page" @click="navigateToMovie(slide.film_id)">
                    </template>
                </slide>
            </carousel-3d>
            <br/>
        </div>
        <div class="category_div">
            <h2>Nombre de la categoria 2 </h2>
            <carousel-3d :width="250" :height="130" :display="7" :controls-visible="true" :controls-prev-html="'❮'"
                :controls-next-html="'❯'" :autoplay="true" :autoplay-timeout="5000" :autoplay-hover-pause="true"
                :border="0" :disable3d="true" :space="265">
                <slide v-for="(slide, i) in dataCarouselCategory" :index="i" :key="i" class="slide_category">
                    <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
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
  import { VueperSlides, VueperSlide } from 'vueperslides'
  import 'vueperslides/dist/vueperslides.css'
  export default {
  
    components: {
        Carousel3d,
        Slide,
        VueperSlides, VueperSlide
  
    },
    data() {
        return {
            dataCarousel: [
                {
                    "film_id": "00112233445566778899aabbccddeeff",
                    "title": "The Great Adventure",
                    "description": "An epic journey through uncharted lands.",
                    "length": 120.50,
                    "status": "Activo",
                    "fk_category": "ffddeeaabbcc99887766554433221100",
                    "front_page": "https://cdn.vox-cdn.com/thumbor/ee_7w0oFtMc2Lse2isdoVq467z4=/0x292:2040x1360/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/16207801/jbareham_190421_0886_pikachu_0001.jpg",
                    "file": "http://example.com/files/the_great_adventure.mp4"
                },
                {
                    "film_id": "11223344556677889900aabbccddeeff",
                    "title": "Mystery of the Lost City",
                    "description": "A thrilling tale of ancient secrets and hidden treasures.",
                    "length": 95.75,
                    "status": "Activo",
                    "fk_category": "eeddccbbaa99887766554433221100ff",
                    "front_page": "https://www.laprensagrafica.com/__export/1505094476263/sites/prensagrafica/img/2015/08/27/7d12e526-cae2-4e36-834e-65b67cdabca1.jpg_1758632411.jpg",
                    "file": "http://example.com/files/mystery_of_the_lost_city.mp4"
                },
                {
                    "film_id": "223344556677889900aabbccddeeff00",
                    "title": "Romance in the Rain",
                    "description": "A love story that blossoms in the heart of a rainy city.",
                    "length": 110.00,
                    "status": "Inactivo",
                    "fk_category": "ccddeeaa99887766554433221100ffbb",
                    "front_page": "https://www.mubis.es/media/users/1864/103428/review-interstellar-christopher-nolan-2014-original.jpg",
                    "file": "http://example.com/files/romance_in_the_rain.mp4"
                },
                {
                    "film_id": "3344556677889900aabbccddeeff0011",
                    "title": "Space Odyssey",
                    "description": "A groundbreaking sci-fi adventure across the universe.",
                    "length": 150.25,
                    "status": "Activo",
                    "fk_category": "bbaadd99887766554433221100ffeedd",
                    "front_page": "https://elcomercio.pe/resizer/tzYPKgD1IiCQItsvPDh8NamCjKA=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/JOORGFI26BAGJIYP6NP25MVKB4.jpg",
                    "file": "http://example.com/files/space_odyssey.mp4"
                }
            ],
            dataCarouselCategory: [
                {
                    "film_id": "00112233445566778899aabbccddeeff",
                    "title": "The Great Adventure",
                    "description": "An epic journey through uncharted lands.",
                    "length": 120.50,
                    "status": "Activo",
                    "fk_category": "ffddeeaabbcc99887766554433221100",
                    "front_page": "https://img.asmedia.epimg.net/resizer/v2/5IVIDTIFJJF4FPVSPNTCL42EVE.jpg?auth=0dc9e916d1b4e5dc8362d3f9e02421b3ff523727d0d5b5b7389fdb11cb1c96e0&width=1472&height=1104&smart=true",
                    "file": "http://example.com/files/the_great_adventure.mp4"
                },
                {
                    "film_id": "11223344556677889900aabbccddeeff",
                    "title": "Mystery of the Lost City",
                    "description": "A thrilling tale of ancient secrets and hidden treasures.",
                    "length": 95.75,
                    "status": "Activo",
                    "fk_category": "eeddccbbaa99887766554433221100ff",
                    "front_page": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4mpt46Iuk6Pr-a4heOg1k6o3KJRGo57tE1Q&s",
                    "file": "http://example.com/files/mystery_of_the_lost_city.mp4"
                },
                {
                    "film_id": "223344556677889900aabbccddeeff00",
                    "title": "Romance in the Rain",
                    "description": "A love story that blossoms in the heart of a rainy city.",
                    "length": 110.00,
                    "status": "Inactivo",
                    "fk_category": "ccddeeaa99887766554433221100ffbb",
                    "front_page": "https://i.blogs.es/c7ed10/screenshot_90/1366_2000.jpeg",
                    "file": "http://example.com/files/romance_in_the_rain.mp4"
                },
                {
                    "film_id": "3344556677889900aabbccddeeff0011",
                    "title": "Space Odyssey",
                    "description": "A groundbreaking sci-fi adventure across the universe.",
                    "length": 150.25,
                    "status": "Activo",
                    "fk_category": "bbaadd99887766554433221100ffeedd",
                    "front_page": "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/DB176BD1488D7E4822256EF1778C124FC17388FC1E7F0F6D89B38AFF5FB001F6/scale?width=1200&amp;aspectRatio=1.78&amp;format=webp",
                    "file": "http://example.com/files/space_odyssey.mp4"
                },
                {
                    "film_id": "44556677889900aabbccddeeff001122",
                    "title": "The Secret Garden",
                    "description": "Discover the hidden wonders of a forgotten garden.",
                    "length": 115.75,
                    "status": "Activo",
                    "fk_category": "ffddeeaabbcc99887766554433221100",
                    "front_page": "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/713EAC98B3CEC6A774A84243AD1FA532576F243B8A152FEA0C03C4E32BBFE018/scale?width=1200&aspectRatio=1.78&format=webp",
                    "file": "http://example.com/files/the_secret_garden.mp4"
                },
                {
                    "film_id": "556677889900aabbccddeeff00112233",
                    "title": "Jurassic Adventure",
                    "description": "An expedition into the world of dinosaurs.",
                    "length": 130.00,
                    "status": "Activo",
                    "fk_category": "eeddccbbaa99887766554433221100ff",
                    "front_page": "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/04/keanu-reeves-saga-john-wick-3010958.jpg?tf=3840x",
                    "file": "http://example.com/files/jurassic_adventure.mp4"
                },
                {
                    "film_id": "6677889900aabbccddeeff0011223344",
                    "title": "The Phantom Manor",
                    "description": "Explore the eerie secrets of a haunted mansion.",
                    "length": 105.50,
                    "status": "Inactivo",
                    "fk_category": "ccddeeaa99887766554433221100ffbb",
                    "front_page": "https://todoaccion.com/wp-content/uploads/2023/09/La-Monja-2-personaje-monja-Todo-Accion-1080x675.jpg",
                    "file": "http://example.com/files/phantom_manor.mp4"
                },
                {
                    "film_id": "77889900aabbccddeeff001122334455",
                    "title": "Underwater Odyssey",
                    "description": "Journey to the depths of the ocean in search of lost treasures.",
                    "length": 140.25,
                    "status": "Activo",
                    "fk_category": "bbaadd99887766554433221100ffeedd",
                    "front_page": "https://arteycultura.com.mx/wp-content/uploads/2014/11/interestelar.jpg",
                    "file": "http://example.com/files/underwater_odyssey.mp4"
                }
            ],
        }
    },
    methods: {
        navigateToMovie(filmId) {
            this.$router.push({ name: 'movie-view', params: { id: filmId } });
        }
    },
    created() {
    console.log(this.dataCarousel);
    this.dataCarousel.forEach(slide => {
    console.log(slide.front_page);
});

}
  }
  </script>
  
  <style>
  .vueperslides--fixed-height { height: 500px; }

  .container{
    padding: 10px;
  }
  .main-container {
    background: #00050D;
  }


  .category_div {
    color: #ffffff;
  }
  
  #carousel_banner {
    margin-top: -20px;
  }
  .slide {
    display: flex;
  }
  .slide_category{
    display: flex;
    border-radius:15px;
  }
  
  </style>
  
  <!-- https://wlada.github.io/vue-carousel-3d/api/ -->
  <!-- https://madewithvuejs.com/carousels -->
  <!-- https://warpcgd.github.io/vue-concise-slider/?ref=madewithvuejs.com -->