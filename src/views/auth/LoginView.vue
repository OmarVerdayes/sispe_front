<template>
  <div class="main-container">
    <div v-if="loading" class="loading-overlay">
      <LoadAnimation />
    </div>
    <div class="login-container">
      <h4><p>INICIAR SESIÓN</p></h4>
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

        <b-form-group id="input-group-2" label="Contraseña:" label-for="password">
          <b-input-group>
            <b-form-input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Ingrese su contraseña"
              required
            ></b-form-input>
            <b-input-group-append>
              <b-button @click="togglePasswordVisibility" variant="outline-secondary">
                <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-button type="submit" variant="danger" id="login_button">Iniciar sesión</b-button>
      </b-form>
      
      <div>
        <hr>
        <p id="create_account">
          ¿No tienes una cuenta?
          <router-link to="/register">Crear cuenta</router-link>
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import AuthService from '../../services/login.js';
import Swal from 'sweetalert2';
import LoadAnimation from '../load/load.vue'; 

export default {
  components: {
    LoadAnimation,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      show: true,
      showPassword: false,
      loading: false,
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async onSubmit(event) {
      event.preventDefault();
      this.loading = true;
      try {
        const response = await AuthService.login(this.form);
        
        if (response && response.id_token && response.role) {
          const user = await AuthService.getUserByEmail(this.form.email);
          const { id_token, role } = response;

          if (user && user.user_id) {
            localStorage.setItem("authUser", JSON.stringify({
              id_token,
              user: {
                rol: { nrol: role },
                id: user.user_id,
                email: user.email
              }
            }));

            if (role === 'admin') {
              this.$router.push('/admin');
            } else if (role === 'cliente') {
              this.$router.push('/client');
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error de inicio de sesión',
                text: 'Rol desconocido. Contacte al administrador.',
              });
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error de inicio de sesión',
              text: 'No se pudo encontrar el usuario por el correo electrónico.',
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error de inicio de sesión',
            text: 'No se pudo obtener id_token del usuario. Respuesta del servidor incorrecta.',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: 'Inicio de sesión fallido. Verifique sus credenciales e intente nuevamente.',
        });
      } finally {
        this.show = true; 
        this.loading = false;
      }
    },
    onReset(event) {
      event.preventDefault();
      this.form.email = '';
      this.form.password = '';
    }
  }
}
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
