<template>
  <div class="main-container">
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

        <b-form-group id="input-group-2" label="Contraseña:" label-for="Contraseña">
          <b-form-input
            id="Contraseña"
            v-model="form.password"
            type="password"
            placeholder="Ingrese su contraseña"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="danger" id="login_button" >Iniciar sesión</b-button>
      </b-form>
      
      <div>
        <hr>
        <b-button variant="priamry" id="pay_service">Pagar servicio</b-button>
        <p style="margin-top: 20px;">O</p>
        <p id="create_account">
          ¿No tienes una cuenta?
          <router-link to="/create_account">Crear cuenta</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      show: true
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
  }
}
</script>
<style scoped>
.main-container {
  background: linear-gradient(to bottom, #061523 0%, #061523e7 50%, #061523ce 100%);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  background-color: rgba(27, 27, 27, 0.4);
  padding: 20px;
  border-radius: 8px;
  color: white;
  max-width: 400px;
  width: 100%;
}

.b-form-group {
  margin-bottom: 20px; /* Espacio entre grupos de formulario */
}

#login_button {
  background-color: #a30000;
  border-color: #a30000;
  font-weight: bold;
  width: 100%;
  margin-top: 20px; /* Espacio arriba del botón */
}

#login_button:hover {
  background-color: #850000; 
  border-color: #850000;
}

#create_account {
  font-size: 15px;
}

p{
  text-align: center;
}

#pay_service {
  color: #fff;
  background-color: #383838ea;
  border-color: #303030ea;
  font-weight: bold;
  width: 100%;
  margin-bottom: 20;
}

#pay_service:hover {
  background-color: #303030ea; 
  border-color: #303030f5;
}
</style>
