<template>
  <div class="main-container">
    <div class="login-container">
      <h4><p>Recuperar Contraseña</p></h4>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Correo:" label-for="email">
          <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Ingrese su correo"
            required
          ></b-form-input>
        </b-form-group>
        <b-button
          type="submit"
          variant="danger"
          id="login_button"
          :disabled="loading"
        >
          <span v-if="loading">Enviando...</span>
          <span v-else>Solicitar codigo</span>
        </b-button>
      </b-form>

      <div>
        <hr />
        <p>
            <router-link v-if="!loading" to="/login">Volver a Iniciar Sesión</router-link>
            <span v-else>Volver a Iniciar Sesión</span>
          </p>          
      </div>
    </div>
  </div>
</template>

<script>
import {sendCode} from "../../services/forgotPassword"
import Swal from "sweetalert2";

export default {
  data() {
    return {
      form: {
        email: "",
      },
      show: true,
      loading: false,
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      this.loading = true;
      try {
        const response = await sendCode(this.form.email);
        if (response && response.status==200) {
          Swal.fire({
            icon: "success",
            title: "Correo enviado",
            text: "Revisa tu correo para continuar con la recuperación de contraseña.",
          });
          this.$router.push("/change_old_password");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo enviar el correo de recuperación. Inténtalo nuevamente.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al intentar recuperar la contraseña.",
        });
      } finally {
        this.show = true;
        this.loading = false;
      }
    },
    onReset(event) {
      event.preventDefault();
      this.form.email = "";
    },
  },
};
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden; 
}

*, *::before, *::after {
  box-sizing: border-box;
}
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.main-container {
  background-image: url('/4.png');
  background-size: cover;
  background-position: center;
  width: 102vw;
  height: 103.8vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 0;
  overflow: hidden; 
}

.login-container {
  background-color: rgba(27, 27, 27, 0.4);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.32);
  max-width: 400px;
  width: 90%;
  position: relative;
}

.b-form-group {
  margin-bottom: 40px; 
}

#login_button {
  background-color: #a30000;
  border-color: #a30000;
  font-weight: bold;
  width: 100%;
  margin-top: 20px;
}

#login_button:hover {
  background-color: #850000; 
  border-color: #850000;
}

#create_account {
  font-size: 15px;
  text-align: center; /* Alinear texto al centro */
}

p {
  text-align: center;
}

#pay_service {
  color: #fff;
  background-color: #383838ea;
  border-color: #303030ea;
  font-weight: bold;
  width: 100%;
  margin-bottom: 20px;
}

#pay_service:hover {
  background-color: #303030ea; 
  border-color: #303030f5;
}
</style>
