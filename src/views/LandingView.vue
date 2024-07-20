<template>
  <div class="page-container">
    <div class="background-image-container">
      <div class="col md-12">
        <h1 class="title">Tu mundo de películas, siempre disponible</h1>
        <h2 class="slogan">Disfruta cuando quieras y donde quieras</h2>
      </div>
      <button @click="login" class="play-button">
        Comenzar
      </button>
    </div>
    <div class="space">
      <div class="row">
        <div class="col" style="margin-top:100px; margin-left: 100px; color: white;">
          <h1>Descubre</h1>
          <h2 style="font-size: 30px;">Una biblioteca cinematográfica sin límites, desde clásicos icónicos hasta las últimas novedades, todo en un solo lugar.</h2>
        </div>
        <div class="col" style="margin-top:20px;">
          <img src="../assets/sispe.gif" width="70%" style="margin-bottom: 30px;">
        </div>
      </div>
      <div class="row">
        <div class="col" style="margin-top:100px; margin-left: 100px; color: white;">
          <h1>Descubre</h1>
          <h2 style="font-size: 30px;">Una biblioteca cinematográfica sin límites, desde clásicos icónicos hasta las últimas novedades, todo en un solo lugar.</h2>
        </div>
        <div class="col" style="margin-top:20px;">
          <img src="../assets/sispe.gif" width="70%" style="margin-bottom: 30px;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.push({name:'login'});
    },
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.page-container {
  position: relative;
  z-index: 1; /* Asegura que esté delante del fondo */
  max-width: 100%;
}

.background-image-container {
  background-image: url('/2.png');
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 0;
  overflow: hidden;
}

.title {
  width: 50%;
  margin-top: 200px;
  margin-left: 70px;
  font-size: 65px;
  color: white;
  font-weight: bold;
}

.slogan {
  margin-top: 50px;
  margin-left: 80px;
  font-size: 30px;
  color: rgb(255, 255, 255);
}

.space {
  background-color: #00050D;
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
}

.play-button:hover {
  background: #c6c6c684;
  color: #ffffff;
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
