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
      <div class="row" style="  background: linear-gradient(to top left,rgba(4, 59, 70, 0.999)1%, rgba(0, 0, 0, 0.855)60%);">
        <h1 style="  font-family: 'Montserrat', sans-serif; text-align: center;color: white;"><strong>Novedades</strong> </h1>
        <p style="color:rgb(211, 211, 211); font-size: 18px; text-align: center;">Regístrate hoy y empieza tu aventura cinematográfica. Con SISPE, cada noche puede ser una noche de película.</p>
        <div class="container">
          <Motion v-for="(image, index) in images" :key="index" class="box" :hover="{ scale: 1.2 }" :press="{ scale: 0.8 }">
            <img :src="image" class="image"/>
          </Motion>
  </div>
      </div>
      <div class="row" style="  background: linear-gradient(to top right,rgba(4, 70, 15, 0.854)1%, rgba(0, 0, 0, 0.855)40%)">
        <div
          class="col"
          style="margin-top: 80px; margin-left: 100px; color: white; "
        >
          <h1 style="  font-family: 'Montserrat', sans-serif;"><strong>Explora</strong> </h1>
          <h2 style="font-size: 30px;  font-family: 'Montserrat', sans-serif; ">
            Explora un mundo de entretenimiento a tu alcance. Descubre contenido exclusivo y recomendaciones personalizadas.
          </h2>
        </div>
        <div class="col" style="margin-left:60px">
          <img
            src="../assets/sispe.gif"
            width="80%"
          />
        </div>
      </div>
      <div class="row" style="  background: linear-gradient(to bottom right,rgba(4, 70, 15, 0.854)1%, rgba(0, 0, 0, 0.855)40%);">        
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
        <div class="col" style="margin-top: 100px; color: white; font-family: 'Montserrat', sans-serif;">
          <h1><strong>Próximamente</strong> </h1>
          <h2>
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
<div class="row" style="background: linear-gradient(to right, rgb(15, 138, 89), rgb(71, 175, 204), rgba(66, 63, 225, 0.975)); justify-content:center; align-items: center; height: 100%;">
    <div class="wrap center" style="text-align: center;">
        <span class="row-label" style="background-color:#325a99;color:white; font-family: 'Montserrat', sans-serif;letter-spacing: 1.3px; padding: 5px; margin-top: 30px;"><strong>Suscripción Especial</strong></span>
        <h2 class="row-title" style="color:white;font-size: 50px;"><strong>¡Únete Ahora por Solo 99 Pesos al Mes!</strong></h2>
        <p style="color:rgb(228, 228, 228); font-size: 18px;">Disfruta de acceso ilimitado a todas nuestras películas y series con nuestra suscripción mensual.</p>
        
        <table style="width: 50%; margin: 0 auto; border-collapse: collapse; margin-top: 20px;">
            <thead>
                <tr style="background-color: #325a99; color: white;">
                    <th style="padding: 10px; ">Características</th>
                    <th style="padding: 10px; ">Detalles</th>
                </tr>
            </thead>
            <tbody>
                <tr style="color: white;">
                    <td style="padding: 10px; border: 1px solid #ddd; ">Acceso Ilimitado</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">A todas las películas</td>
                </tr>
                <tr style="color: white;">
                    <td style="padding: 10px; border: 1px solid #ddd;">Sin Anuncios</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Disfruta de contenido sin interrupciones.</td>
                </tr>
                <tr style="color: white;">
                    <td style="padding: 10px; border: 1px solid #ddd;">Calidad HD</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Mira tus programas favoritos en alta definición.</td>
                </tr> 
            </tbody>
        </table>
        
        <button style="margin-top: 20px; padding: 10px 20px; background-color: #325a9974; color: white; border: 1px solid rgba(221, 221, 221, 0.474); font-family: 'Montserrat', sans-serif; font-size: 16px; cursor: pointer;">
            Suscribirse Ahora
        </button>
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
import { Motion } from '@oku-ui/motion';
import { KinesisContainer, KinesisElement } from "vue-kinesis";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  components: {
    KinesisContainer,
    KinesisElement,
    VueperSlides,
    VueperSlide,
    Motion
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
      ],
      images: [
  'https://www.quepelivemoshoy.com/wp-content/uploads/2020/11/poster-los-vengadores.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkKtIg1niPQzvEVP2y0A_eud0zMCqHEpknBg&s',
  'https://http2.mlstatic.com/D_NQ_NP_671450-MLM48198252023_112021-O.webp',
  'https://lumiere-a.akamaihd.net/v1/images/p_rayaandthelastdragon_21294_83346778.jpeg',
  'https://es.web.img3.acsta.net/img/90/ea/90ea2e07d6c5897672fbd39c73b4d14f.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjaYIXnWodD6NhEDJO8-XzRnH20CiZMrnvpA&s'
],
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
.container {
  display: flex;
  gap: 50px;
}
.box {
  border-radius: 25px;
  width: 170px;
  height: 200px;
  overflow: hidden;
}
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.row:not(:first-child) {
  border-top: 5px solid rgb(30, 30, 32);
  padding-top: 20px; 
}

html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow: auto; /* Permite el desplazamiento */
  scrollbar-width: none; 
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
  background: linear-gradient(to top, rgb(7, 43, 69), rgba(0, 0, 0, 0.855)60%);
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
