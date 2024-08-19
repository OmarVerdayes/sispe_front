<template>
  <b-container fluid style="margin: 0; padding: 0;">
    <b-navbar class="navbar" toggleable="md" type="dark">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-navbar-brand :to="{ path: '/admin' }">
        <img src="/logo.png" alt="Logo" width="140" height="40" style="margin-left:40px; margin-top: 0px;" class="d-inline-block align-top">
      </b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mx-auto">
          <b-nav-item :to="{ name: 'homeAdmin' }" @click="selectOption('homeAdmin')" :class="{ 'active': selectedOption === 'homeAdmin' }">Inicio</b-nav-item>
          <b-nav-item :to="{ name: 'profile-admin' }" @click="selectOption('profile-admin')" :class="{ 'active': selectedOption === 'profile-admin' }">Mi cuenta</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
<button class="Btn" @click="logout">
  <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
  <div class="text">Logout</div>
</button>
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
.Btn {
  display: flex;
  margin-right:20px;
  align-items: center;
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: .3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: rgb(30, 215, 163);
}

.sign {
  width: 100%;
  transition-duration: .3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 17px;
}

.sign svg path {
  fill: white;
}
.text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.0em;
  font-weight: 600;
  transition-duration: .3s;
}
.Btn:hover {
  width: 125px;
  border-radius: 40px;
  transition-duration: .3s;
}

.Btn:hover .sign {
  width: 30%;
  transition-duration: .3s;
  padding-left: 20px;
}
.Btn:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: .3s;
  padding-right: 10px;
}
.Btn:active {
  transform: translate(2px ,2px);
}
</style>
