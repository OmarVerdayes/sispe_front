<template>
    <b-container fluid style="margin: 0; padding: 0;">
      <b-navbar class="navbar" toggleable="md" type="dark">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
  
        <b-navbar-brand :to="{ path: '/client' }">
          <img src="/logo.png" alt="Logo" width="140" height="40" style="margin-left:40px; margin-top: 0px;" class="d-inline-block align-top">
        </b-navbar-brand>
  
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="mx-auto">
            <b-nav-item :to="{ name: 'home' }" @click="selectOption('home')" :class="{ 'active': selectedOption === 'home' }">Inicio</b-nav-item>
            <b-nav-item :to="{ name: 'search' }" @click="selectOption('search')" :class="{ 'active': selectedOption === 'search' }">Búsqueda</b-nav-item>
            <b-nav-item :to="{ name: 'favorite' }" @click="selectOption('favorite')" :class="{ 'active': selectedOption === 'favorite' }">Mis favoritos</b-nav-item>
            <b-nav-item :to="{ name: 'profile' }" @click="selectOption('profile')" :class="{ 'active': selectedOption === 'profile' }">Mi cuenta</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-button variant="outline-light" @click="logout">Cerrar Sesión</b-button>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <b-row>
        <router-view />
      </b-row>
    </b-container>
  </template>
  
  <script>
  import AuthService from '../../services/login.js';
  
  export default {
    data() {
      return {
        selectedOption: null,
      };
    },
    methods: {
      selectOption(option) {
        this.selectedOption = option;
      },
      logout() {
        AuthService.logout();
        this.$router.push({ name: 'login' });
      },
    },
    mounted() {
  console.log('NavbarUser component mounted');
}
  };
  </script>
  
  <style scoped>
  .navbar {
    background-color: #00050D;
    padding-top: 10px;
    width: 100%;
  }
  
  .navbar-nav .nav-item.active {
    background-color: #1e1d2f;
    border-radius: 10px 10px 0px 0px;
  }
  
  .navbar-nav .nav-item {
    margin-right: 30px;
  }
  
  #btn_adopt {
    align-items: right;
    margin-left: 1000px;
    margin-bottom: 10px;
  }
  
  #btn_dar {
    align-items: left;
  }
  </style>
  