<template>
    <div class="wrap nest">
      <div class="left">
        <span class="row-cat">IA generativa</span>
        <h2>¡Ver más con la expansión generativa IA!</h2>
        <p>Explora más allá de los límites de tu lienzo con la expansión generativa, haz que tu imagen se ajuste en cualquier aspecto sin recortar las mejores partes. Simplemente expande en cualquier dirección y el nuevo contenido se fusionará sin problemas con la imagen.</p>
        <a href="/express/?tool=generative-expand" class="button med rounded" title="AI Generative Expand">Probar expansión generativa</a>
      </div>
      <div class="right">
        <div class="box-out">
          <div id="ai-generative-expand" class="box-content" @mouseover="expandImage" @mouseout="resetImage">
            <img src="../../../2.png" alt="AI Generative Expand Example">
          </div>
          <div class="box-glow"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        originalImage: '/images/index/generative-expand-front.webp',
        expandedImage: '/images/index/generative-expand-back.webp',
        currentImage: '/images/index/generative-expand-front.webp',
      };
    },
    methods: {
      expandImage() {
        this.currentImage = this.expandedImage;
      },
      resetImage() {
        this.currentImage = this.originalImage;
      },
    },
  };
  </script>
  
  <style scoped>
  .wrap {
    display: flex;
    justify-content: space-between;
  }
  
  .left, .right {
    flex: 1;
  }
  
  .button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 1.9s;
  }
  
  .button:hover {
    background-color: #0056b3;
  }
  
  .box-out {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .box-content img {
    width: 100%;
    transition: transform 0.5s ease;
  }
  
  .box-content:hover img {
    transform: scale(1.1);
  }
  
  .box-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }
  </style>
  