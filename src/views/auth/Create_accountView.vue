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

        <div id="card-element" ></div>

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
import { loadStripe } from '@stripe/stripe-js';
import { registerUser } from '../../services/register.js';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      form: {
        name: '',
        lastname: '',
        email: ''
      },
      stripe: null,
      card: null
    };
  },
  async mounted() {
    this.stripe = await loadStripe('pk_test_51N9cXBBaClI6m8PYfkLfcN5pkMpDqKQ6ofVcpK9QFCSO3xaprXViIKdqXooys7je5Xb7fNQVzZPZvJeOIMq7Ww1B004Gf1ujOo');
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');
  },
  methods: {
    async onSubmitRegister(event) {
    event.preventDefault();
    
    try {
      const { token, error } = await this.stripe.createToken(this.card);

      if (error) {
        console.error('Error creating token:', error);
      } else if (token) {
        const userData = {
          name: this.form.name,
          lastname: this.form.lastname,
          email: this.form.email,
          stripeToken: token.id,
          fkRol:"3c8816802eb011efb5fd0affc0d2e18d"
        };
        console.log('Datos enviados al registrar usuario:', userData);
        
        try {
          const response = await registerUser(userData);
          console.log('User registered successfully:', response);
          Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'User registered successfully!'
            });
        } catch (error) {
          console.error('Error registering user:', error);
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error registering user: ' + error.message
            });
        }
      } else {
        console.error('Failed to create token');
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to create token'
          });
      }
    } catch (error) {
      console.error('Error processing registration:', error);
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error processing registration: ' + error.message
        });
    }
  },
    onReset(event) {
      event.preventDefault();
      this.form.name = '';
      this.form.lastname = '';
      this.form.email = '';
    }
  }
};
</script>
<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';

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

p {
  text-align: center;
}

#card-element {
  margin-top: 20px;
}
</style>
