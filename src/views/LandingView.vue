<template>
  <div class="page-container">
    <div class="background-image-container">
      <div class="col md-12">
        <h1 class="title">Tu mundo de películas, siempre disponible</h1>
        <h2 class="slogan">Disfruta cuando quieras y donde quieras</h2>
      </div>
      <button @click="login" class="play-button">Comenzar</button>
    </div>
    <div class="space">
      <div class="row">
        <div
          class="col"
          style="margin-top: 100px; margin-left: 100px; color: white; "
        >
          <h1 style="  font-family: 'Montserrat', sans-serif;"><strong>Explora</strong> </h1>
          <h2 style="font-size: 30px;  font-family: 'Montserrat', sans-serif; letter-spacing: 1.3px;">
            Explora un mundo de entretenimiento a tu alcance. Descubre contenido exclusivo y recomendaciones personalizadas.
          </h2>
        </div>
        <div class="col">
          <img
            src="../assets/sispe.gif"
            width="100%"
          />
        </div>
      </div>
      <div class="row" style="margin-top:0px;">
        <div class="col" style="margin-top: 20px; margin-left: 100px">
          <kinesis-container>
            <kinesis-element :strength="30" type="depth">
              <div class="circle large"></div>
            </kinesis-element>
            <kinesis-element :strength="25" type="depth">
              <div class="circle small"></div>
            </kinesis-element>
            <div class="image-container">
              <kinesis-element :strength="20" type="depth">
                <img
                  src="../assets/lan1.png"
                  width="100%"
                  style="margin-bottom: 30px"
                />
                <kinesis-element :strength="30" type="depth">
                  <div class="circle-outline"></div>
                </kinesis-element>
              </kinesis-element>
            </div>
          </kinesis-container>
        </div>
        <div class="col" style="margin-top: 100px; color: white">
          <h1 style="  font-family: 'Montserrat', sans-serif;"><strong>Próximamente</strong> </h1>
          <h2 style="  font-family: 'Montserrat', sans-serif;">
            Anticípate a lo nuevo. Conoce los próximos estrenos y mantente al día con las novedades más esperadas.
          </h2>
        </div>
      </div>
      <div class="row carousel-container" >
  <div class="carousel-content">
    <h1>LO MEJOR EN</h1>
    <vueper-slides
    :bullets="false"
      ref="vueperslides2"
      :slide-ratio="1 / 8"
      :dragging-distance="50"
      @slide="
        $refs.vueperslides1 &&
          $refs.vueperslides1.goToSlide($event.currentSlide.index, {
            emit: false,
          })
      "
      :visible-slides="3"
      fixed-height="100px"
    >
      <vueper-slide
      v-for="(category, i) in categories"
    :key="i"
        @click.native="
          $refs.vueperslides2 && $refs.vueperslides2.goToSlide(i)
        "
      >
        <template #content >
          <div class="vueperslide__content-wrapper">
            <div class="vueperslide__title" style="font-size:40px">{{ category.name }}</div>
          </div>
        </template>
      </vueper-slide>
    </vueper-slides>
    <vueper-slides
    :touchable="false"
  :arrows="false"
    slide-multiple
    :gap="5"
      ref="vueperslides1"
      @slide="
        $refs.vueperslides2 &&
          $refs.vueperslides2.goToSlide($event.currentSlide.index, {
            emit: false,
          })
      "
      :slide-ratio="1 / 3"
      :bullets="false"
    >
      <vueper-slide
      v-for="(category, i) in categories"
      :key="i"
        :title="i.toString()"
      />
    </vueper-slides>
  </div>
</div>
<div class="row carousel-container" >
  <div class="carousel-content">
    <h1>CUANDO Y DÓNDE QUIERAS</h1>
    <img
            src="../assets/dispoB.gif"
            width="100%" 
          />   
  </div>
</div>
    </div>
  </div>
</template>


<script>
import { KinesisContainer, KinesisElement } from "vue-kinesis";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  components: {
    KinesisContainer,
    KinesisElement,
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      categories: [
        { name: 'Terror' },
        { name: 'Comedia' },
        { name: 'Drama' },
        { name: 'Infantil' },
        { name: 'Acción' },
        { name: 'Romance' }
      ]
    }
  },
  methods: {
    login() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.page-container {
  position: relative;
  z-index: 1;
  max-width: 100%;
}

.background-image-container {
  background-image: url("/2.png");
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.background-image-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.855)108%);
  z-index: 1;
}

.title {
  width: 50%;
  margin-top: 200px;
  margin-left: 70px;
  font-size: 65px;
  color: white;
  font-weight: bold;
  position: relative;
  z-index: 2;
}

.slogan {
  margin-top: 50px;
  margin-left: 80px;
  font-size: 30px;
  color: rgb(255, 255, 255);
  position: relative;
  z-index: 2;
}

.space {
  background: linear-gradient(to top, #08042e, rgba(0, 0, 0, 0.855)113%);
  background-color: #000000;
  padding: 100px 0;
}

.play-button {
  margin-left: 100px;
  display: inline-block;
  padding: 13px 30px;
  margin-top: 100px;
  background: #f5f5f5;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-size: 1em;
  transition: background 0.3s;
  position: relative;
  z-index: 2;
}

.play-button:hover {
  background: #c6c6c684;
  color: #ffffff;
}

.image-container {
  position: relative;
  width: 90%;
  margin-bottom: 30px;
}

.circle {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  z-index: -1;
}

.circle.small {
  width: 50px;
  height: 50px;
  background-color: rgba(8, 224, 123, 0.5);
}

.circle.large {
  width: 100px;
  height: 100px;
  background-color: rgba(0, 158, 84, 0.5);
}

.circle-outline {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 70px;
  height: 70px;
  border: 5px solid rgba(0, 158, 84, 0.5);
  border-radius: 50%;
  z-index: 1;
}

.carousel-container {
  justify-content: center;
}

.carousel-content {
  margin-top: 100px;
  width: 80%;
  color: white;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  align-items: center;
  font-size: 10px;
}

@media (max-width: 768px) {
  .play-button {
    top: 30%;
    left: 5%;
  }
  .title {
    margin-top: 100px;
    left: 1%;
    font-size: 50px;
    color: white;
    font-weight: bold;
  }
}
</style>
