<template>
    <b-container  fluid style="margin: 0; padding: 0;">
  <b-navbar class="navbar" toggleable="md" type="dark">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-navbar-brand :to="{ path: '/landing' }">
        <img src="/logo.png" alt="Logo" width="140" height="40" style="margin-left:40px; margin-top: 0px;" class="d-inline-block align-top">
      </b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="mx-auto">
              <b-nav-item :to="{ name: 'login' }" @click="selectOption('home')"
                  :class="{ 'active': selectedOption === 'home' }">INICIAR SESIÓN</b-nav-item>
          </b-navbar-nav>
      </b-collapse>
     
  </b-navbar>
  <b-row>
      <router-view />
  </b-row>
</b-container>
</template>

<script>
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
  },
};
</script>

<style scoped>
.navbar {
  background: linear-gradient(to right, #00050D 40%, #00000000);
  padding-top: 10px;
  width: 100%;
  position: fixed;
  z-index: 1000;
}



.navbar-nav .nav-item.active {
  background-color: #212b46;
  border-radius: 10px 10px 0px 0px;
}
.navbar-nav .nav-item {
margin-right: 30px; 
}
#btn_adopt{
  align-items: right;
  margin-left: 1000px;
  margin-bottom: 10px;
}
#btn_dar{
  align-items: left;
}
</style>
