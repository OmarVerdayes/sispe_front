<template>
    <div class="card-container">
      <div class="card">Películas</div>
      <div class="card">Categorías</div>
      <div class="card">Perfil</div>
    </div>
  </template>
  
  <script>
  export default {
    
  }
  </script>
  
  <style>
  .card-container {
    display: flex;
    justify-content: center; 
    gap: 20px; 
    padding: 20px; 
    align-items: center;
    height: 90vh;
  }
  
  .card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    width: 350px;
    height: 300px;
    text-align: center;
    justify-content: center; 
    align-items: center;
  }
  </style>
  