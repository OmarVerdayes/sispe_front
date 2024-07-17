<template>
  <div class="main-container">
    <div class="register-container">
      <h4><p>REGISTRO</p></h4>
      <b-form @submit="onSubmitRegister" @reset="onReset">
        <b-form-group id="input-group-1" label="Nombre:" label-for="name">
          <b-form-input
            id="name"
            v-model="form.name"
            type="text"
            placeholder="Ingrese su nombre"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Apellido:" label-for="lastname">
          <b-form-input
            id="lastname"
            v-model="form.lastname"
            type="text"
            placeholder="Ingrese su apellido"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Correo:" label-for="email">
          <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Ingrese su correo"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Contraseña:" label-for="password">
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

        <b-button type="submit" variant="danger" id="login_button">Registrarse</b-button>
      </b-form>
      
      <div>
        <hr>
        <p id="login_link">
          ¿Ya tienes una cuenta?
          <router-link to="/login">Iniciar sesión</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '../../services/login.js';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      form: {
        name: '',
        lastname: '',
        email: '',
        password: '',
      },
      showPassword: false,
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    onSubmitRegister(event) {
      event.preventDefault();
      AuthService.register(this.form)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'Ahora puedes iniciar sesión con tus credenciales.',
          });
          this.$router.push('/login');
        })
        .catch(error => {
          console.error('Error during registration:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error de registro',
            text: 'Hubo un problema durante el registro. Por favor, inténtalo nuevamente más tarde.',
          });
        });
    },
    onReset(event) {
      event.preventDefault();
      this.form.name = '';
      this.form.lastname = '';
      this.form.email = '';
      this.form.password = '';
    }
  }
}
</script>
  <style scoped>
  @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';

  .main-container {
    background-image: url('/4.png');
    background-size: cover;
    background-position: center;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 0;
  }

  .register-container {
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
    text-align: center;
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
