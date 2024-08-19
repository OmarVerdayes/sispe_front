<template>
  <div class="main-container">
    <div class="register-container">
      <h4>
        <p>CAMBIAR CONTRASEÑA</p>
      </h4>
      <b-form @submit="onSubmitChangePassword" @reset="onReset">
        <b-form-group id="input-group-email" label="Correo Electrónico:" label-for="email">
          <b-form-input id="email" v-model="form.email" type="email" placeholder="Ingrese su correo electrónico"
            required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-temp-password" label="Contraseña Temporal:" label-for="tempPassword">
          <b-input-group>
            <b-form-input id="tempPassword" v-model="form.tempPassword" :type="showTempPassword ? 'text' : 'password'"
              placeholder="Ingrese su contraseña temporal" required></b-form-input>
            <b-input-group-append>
              <b-button @click="toggleTempPassword" variant="outline-secondary">
                <i :class="showTempPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-form-group id="input-group-new-password" label="Nueva Contraseña:" label-for="newPassword">
          <b-input-group>
            <b-form-input id="newPassword" v-model="form.newPassword" :type="showNewPassword ? 'text' : 'password'"
              placeholder="Ingrese su nueva contraseña" required></b-form-input>
            <b-input-group-append>
              <b-button @click="toggleNewPassword" variant="outline-secondary">
                <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-form-group id="input-group-confirm-password" label="Confirmar Contraseña:" label-for="confirmPassword">
          <b-input-group>
            <b-form-input id="confirmPassword" v-model="form.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'" placeholder="Confirme su nueva contraseña"
              required></b-form-input>
            <b-input-group-append>
              <b-button @click="toggleConfirmPassword" variant="outline-secondary">
                <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
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
        <p id="login_link">
          <router-link :to="loading ? '#' : '/login'" :class="{ disabled: loading }">Volver a Iniciar
            sesión</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { UpdateRegisterPassword } from "../../services/UpdateRegisterPassword.js";

export default {
  data() {
    return {
      form: {
        email: '',
        tempPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      showTempPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      loading: false
    };
  },
  methods: {
    toggleTempPassword() {
      this.showTempPassword = !this.showTempPassword;
    },
    toggleNewPassword() {
      this.showNewPassword = !this.showNewPassword;
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    async onSubmitChangePassword(event) {
      event.preventDefault();
      this.loading = true;

      if (this.form.newPassword !== this.form.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Las contraseñas no coinciden'
        });
        this.loading = false;
        return;
      }

      try {
        const data = {
          "email": this.form.email,
          "temporary_password": this.form.tempPassword,
          "new_password": this.form.newPassword
        }

        const response = await UpdateRegisterPassword(data);

        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Contraseña cambiada con éxito'
        }).then(() => {
          this.$router.push('/login');
        });
      } catch (error) {
        console.error('Error changing password:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cambiar la contraseña: ' + error.message
        });
      } finally {
        this.loading = false;
      }
    },
    onReset(event) {
      event.preventDefault();
      this.form.email = '';
      this.form.tempPassword = '';
      this.form.newPassword = '';
      this.form.confirmPassword = '';
    }
  }
};
</script>

<style scoped>
/* Manteniendo los estilos originales */
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