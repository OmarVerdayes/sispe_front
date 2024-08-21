<template>
    <div class="main-container">
      <div class="register-container">
        <h4>
          <p>CAMBIAR CONTRASEÑA</p>
        </h4>
        <b-form @submit="onSubmitChangePassword" @reset="onReset">
          <!-- Correo Electrónico -->
          <b-form-group id="input-group-email" label="Correo Electrónico:" label-for="email">
            <b-form-input id="email" v-model="form.email" type="email" placeholder="Ingrese su correo electrónico" required></b-form-input>
          </b-form-group>
  
          <!-- Código de Confirmación -->
          <b-form-group id="input-group-confirmation-code" label="Código de Confirmación:" label-for="confirmationCode">
            <b-input-group>
              <b-form-input id="confirmationCode" v-model="form.confirmationCode" placeholder="Ingrese el código de confirmación" required></b-form-input>
            </b-input-group>
          </b-form-group>
  
          <!-- Nueva Contraseña -->
          <b-form-group id="input-group-new-password" label="Nueva Contraseña:" label-for="newPassword">
            <b-input-group>
              <b-form-input id="newPassword" v-model="form.newPassword" :type="showNewPassword ? 'text' : 'password'" placeholder="Ingrese su nueva contraseña" required></b-form-input>
              <b-input-group-append>
                <b-button @click="toggleNewPassword" variant="outline-secondary">
                  <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
  
          <b-button type="submit" variant="danger" id="login_button" :disabled="loading">
            <span v-if="loading"><i class="fas fa-spinner fa-spin"></i> Cambiando...</span>
            <span v-else>Cambiar Contraseña</span>
          </b-button>
        </b-form>
  
        <div>
          <hr>
          <p>
            <router-link v-if="!loading" to="/forgot_password">Regresar</router-link>
            <span v-else>Regresar</span>
          </p>          
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  import { changePassword } from "../../services/forgotPassword";
  
  export default {
    data() {
      return {
        form: {
          email: '',
          confirmationCode: '',
          newPassword: ''
        },
        showNewPassword: false,
        loading: false
      };
    },
    methods: {
      toggleNewPassword() {
        this.showNewPassword = !this.showNewPassword;
      },
      async onSubmitChangePassword(event) {
        event.preventDefault();
        this.loading = true;
  
        try {
          const data = {
            "email": this.form.email,
            "confirmation_code": this.form.confirmationCode,
            "new_password": this.form.newPassword
          };
  
          const response = await changePassword(data);
          console.log('llego:',response);
          
          if(response && response.status==200){
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Contraseña cambiada con éxito'
            }).then(() => {
                this.$router.replace('/login');
            });
          }else if(response && response.data.error_message){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Codigo proporcionado invalid, por favor solicita nuevamente un codigo.'
            });
          }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al cambiar la contraseña'
            });
          }
        } catch (error) {
          console.error('Error changing password:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al cambiar la contraseña: ' + error.response.data.error_message
          });
        } finally {
          this.loading = false;
        }
      },
      onReset(event) {
        event.preventDefault();
        this.form.email = '';
        this.form.confirmationCode = '';
        this.form.newPassword = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .main-container {
    background-image: url('/4.png');
    background-size: cover;
    background-position: center;
    width: 102vw;
    height: 103vh;
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
  
  #login_link {
    font-size: 15px;
    text-align: center;
  }
  
  #login_link .disabled {
    pointer-events: none;
    color: gray;
  }
  
  p {
    text-align: center;
  }
  </style>
  