<template>
  <div class="about">
    <div class="title-content">
      <h1 class="title">Mi lista</h1>
    </div>
    <div class="movie-container">
      <div class="movie-card" v-for="movie in movies" :key="movie.film_id">
        <img :src="movie.front_page" alt="Portada de la película">
        <h2>{{ movie.title }}</h2>
        <h2 style="font-size:16px; color: rgb(75, 75, 75);">{{ movie.length }}</h2><b-icon icon="heart-fill" ></b-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [
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
      ]
    };
  }
};
</script>

<style scoped>
.about {
  background-color: #00050D;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  color: white;
}

.movie-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.movie-card {
  width: 300px;
  border-radius: 8px;
  overflow: hidden;
  text-align: left;
  color: rgba(255, 255, 255, 0.561);
}

.movie-card img {
  width: 100%;
  height: auto;
}

.movie-card h2 {
  margin: 10px;
  font-size: 26px;
}
</style>
