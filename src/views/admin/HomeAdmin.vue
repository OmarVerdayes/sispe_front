<template>
  <div class="main-container">
    <div v-if="loading" class="loading-overlay">
      <LoadAnimation />
    </div>
    <input
      style="margin: 20px"
      type="text"
      placeholder="Título, Género y más."
      class="search-input"
    />
    <div class="button-container">
      <button @click="openAddModal" class="Btn">
        <div class="sign">+</div>
        <div class="text">Agregar película</div>
      </button>
    </div>

    <div style="margin: 50px">
      <div v-else>
        <div v-if="Object.keys(filmsByCategory).length">
          <div v-for="(films, category) in filmsByCategory" :key="category">
            <p style="font-size: 24px; color: white">{{ category }}</p>
            <div class="row">
              <div v-for="film in films" :key="film.film_id" class="col-md-2">
                <div class="film-card" @click="selectFilm(film)">
                  <img
                    :src="film.banner"
                    alt="Front Page"
                    width="180"
                    height="270"
                    class="film-image"
                  />
                  <div class="film-info">
                    <div
                      class="row"
                      style="margin-top: 5px; color: rgb(120, 120, 121)"
                    >
                      <div class="col-6">
                        <p>Duración:</p>
                      </div>
                      <div class="col-6">
                        <p>{{ film.length }} min</p>
                      </div>
                      <h2
                        style="font-size: 20px; color: rgb(197, 196, 195); top: 0"
                      >
                        {{ film.title }}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <h2 style="color: white; text-align: center">Editar Película</h2>

        <div class="modal-body">
          <div class="row">
            <div
              class="col"
              style="
                justify-content: center;
                align-items: center;
                text-align: center;
                margin-left: 20px;
              "
            >
              <img
                :src="selectedMovie.banner"
                alt="Front Page"
                width="220"
                height="170"
                class="film-image"
              />
            </div>
            <div
              class="col"
              style="
                justify-content: center;
                align-items: center;
                text-align: center;
              "
            >
              <div class="checkbox-wrapper-5" style="align-items: center; justify-content:center">
                <h5>Estado:</h5>
                <div class="check">
                  <input
                    checked=""
                    id="check-5"
                    type="checkbox"
                    v-model="selectedMovie.status"
                  />
                  <label for="check-5"></label>
                </div>
              </div>
              <input
                v-model="selectedMovie.title"
                placeholder="Título"
                class="info-input"
                style="width: 220px"
              />
              <input
                v-model="selectedMovie.length"
                placeholder="Duración (min)"
                class="info-input"
                style="width: 220px"
              />
            </div>
          </div>
          <textarea
            v-model="selectedMovie.description"
            placeholder="Descripción"
            class="description-textarea"
          ></textarea>
        </div>
        <div class="modal-footer">
          <button @click="close" class="cancel">Cancelar</button>
          <button @click="updateFilm" class="save">Guardar</button>
        </div>
      </div>
    </div>

    <div v-if="showAddModal" class="modal-overlay" @click.self="closeAddModal">
      <div class="modal-content">
        <h2 style="color: white; text-align: center">Agregar Película</h2>

        <div class="modal-body">
          <form @submit.prevent="addFilm">
            <label for="title">Título:</label>
            <input type="text" id="title" v-model="movie.title" required />

            <label for="description">Descripción:</label>
            <textarea id="description" class="description-textarea" v-model="movie.description" required></textarea>

            <label for="length">Duración (minutos):</label>
            <input type="number" id="length" v-model.number="movie.length" required />

            <label for="fk_category">Categoría:</label>
            <select id="fk_category" v-model="movie.fk_category" required>
              <option v-for="category in categories" :key="category.category_id" :value="category.category_id">
                {{ category.name }}
              </option>
            </select>

            <label for="front_page">Imagen de Fondo:</label>
            <input type="file" id="front_page" @change="handleFileUpload($event, 'front_page')" accept="image/*" required />

            <label for="banner">Imagen de Portada:</label>
            <input type="file" id="banner" @change="handleFileUpload($event, 'banner')" accept="image/*" required />

            <label for="file">Archivo de Video:</label>
            <input type="file" id="file" @change="handleFileUpload($event, 'file')" accept="video/*" required />

            <div class="modal-footer">
              <button type="button" @click="closeAddModal" class="cancel">Cancelar</button>
              <button type="submit" class="save">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { byAll } from "../../services/movie.js";
import { createMovie } from '../../services/movie';
import { fetchCategories } from '../../services/categories';
import Swal from 'sweetalert2';
import LoadAnimation from '../load/load.vue';

export default {
  components: {
    LoadAnimation,
  },
  data() {
    return {
      movie: {
        title: '',
        description: '',
        length: 0,
        status: 'Activo',
        fk_category: '',
        front_page: null,
        file: null,
        banner: null
      },
      categories: [],
      filmsByCategory: {},
      showModal: false,
      showAddModal: false,
      selectedMovie: {},
      loading: false, 
    };
  },
  async mounted() {
    this.loading = true;
    this.categories = await fetchCategories();
    console.log('Categorías cargadas:', this.categories);
    try {
      this.filmsByCategory = await byAll();
    } catch (error) {
      console.error("Error loading films:", error);
    }
    this.loading = false;
  },
  methods: {
    selectFilm(film) {
      this.selectedMovie = { ...film, status: film.status === "Activo" };
      this.showModal = true;
    },
    async updateFilm() {
      this.loading = true;
      try {
        this.selectedMovie.status = this.selectedMovie.status
          ? "Activo"
          : "Inactivo";

        const response = await fetch(
          "https://dld295hsy3.execute-api.us-east-1.amazonaws.com/Prod/film",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.selectedMovie),
          }
        );

        if (!response.ok) {
          throw new Error("Error al actualizar la película");
        }

        const result = await response.json();
        console.log("Película actualizada:", result);
        Swal.fire({
          title: 'Éxito',
          text: 'Película actualizada exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.showModal = false;
        this.filmsByCategory = await byAll();
      } catch (error) {
        console.error("Error al guardar la película:", error);
        Swal.fire({
          title: 'Error',
          text: `Error al actualizar la película: ${error.message}`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
      this.loading = false;
    },
    close() {
      this.showModal = false;
    },
    openAddModal() {
      this.showAddModal = true;
    },
    closeAddModal() {
      this.showAddModal = false;
      this.movie = {
        title: '',
        length: '',
        description: '',
        banner: '',
      };
    },
    async addFilm() {
      this.loading = true;
      try {
        console.log("Datos de la película que se va a registrar:", this.movie);
        const createdMovie = await createMovie(this.movie);
        if (createdMovie) {
          Swal.fire({
            title: 'Éxito',
            text: 'Película registrada exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.resetForm();
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo registrar la película.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: `Error al registrar la película: ${error.message}`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
      this.loading = false;
    },
    async submitForm() {
      this.loading = true;
      try {
        const createdMovie = await createMovie(this.movie);
        if (createdMovie) {
          Swal.fire({
            title: 'Éxito',
            text: 'Película registrada exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.resetForm();
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo registrar la película.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: `Error al registrar la película: ${error.message}`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
      this.loading = false;
    },
    resetForm() {
      this.movie = {
        title: '',
        description: '',
        length: 0,
        status: 'Activo',
        fk_category: '',
        front_page: null,
        file: null,
        banner: null
      };
    },
    handleFileUpload(event, type) {
      const file = event.target.files[0];
      this.movie[type] = file;
    }
  },
};
</script>


<style>
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
  background: #0e141e;
  width: 110vw;
   z-index: 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 20px;
}
.search-input {
  margin: 20px;
  font-size: 20px;
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  margin-bottom: 20px;
}
.film-card {
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;
}
.film-info {
  color: white;
}
.film-image {
  border-radius: 5px;
  transition: transform 0.2s;
}
.film-card:hover .film-image {
  transform: scale(1.05);
}
.button-container {
  display: flex;
  justify-content: flex-end;
  margin-right: 60px;
}
.Btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45px;
  height: 45px;
  border-radius: calc(45px / 2);
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: 0.3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background: linear-gradient(144deg, #40dcff, #2289c4 50%, #0062eb);
}
.sign {
  width: 100%;
  font-size: 2.2em;
  color: white;
  transition-duration: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1em;
  font-weight: 500;
  transition-duration: 0.3s;
}
.Btn:hover {
  width: 125px;
  transition-duration: 0.3s;
}
.Btn:hover .sign {
  width: 30%;
  transition-duration: 0.3s;
  padding-left: 15px;
}
.Btn:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: 0.3s;
  padding-right: 15px;
}
.Btn:active {
  transform: translate(2px, 2px);
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: #1a2331;
  color: rgb(219, 219, 219);
  border-radius: 8px;
  width: 500px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
.modal-body input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  color: rgb(219, 219, 219);
  background-color: rgba(238, 237, 237, 0.094);
  border-radius: 10px;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
}
.save {
  padding: 10px 25px;
  margin: 10px;
  border-radius: 50px;
  cursor: pointer;
  border: 0;
  background-color: rgba(86, 162, 195);
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-size: 15px;
  transition: all 0.5s ease;
}

.save:hover {
  letter-spacing: 3px;
  background-color: rgb(8, 201, 220);
  color: hsl(0, 0%, 100%);
  box-shadow: rgb(24, 200, 220) 0px 7px 29px 0px;
}

.save:active {
  letter-spacing: 3px;
  background-color: rgb(24, 194, 220);
  color: hsl(0, 0%, 100%);
  box-shadow: rgb(24, 210, 220) 0px 0px 0px 0px;
  transform: translateY(10px);
  transition: 100ms;
}

.cancel {
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  border: 0;
  background-color: rgb(238, 115, 115);
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-size: 15px;
  transition: all 0.5s ease;
}

.cancel:hover {
  letter-spacing: 3px;
  background-color: rgb(182, 40, 40);
  color: hsl(0, 0%, 100%);
  box-shadow: rgb(220, 24, 24) 0px 7px 29px 0px;
}

.cancel:active {
  letter-spacing: 3px;
  background-color: rgb(220, 24, 27);
  color: hsl(0, 0%, 100%);
  box-shadow: rgb(220, 24, 31) 0px 0px 0px 0px;
  transform: translateY(10px);
  transition: 100ms;
}
.modal-body {
  display: flex;
  flex-direction: column;
}

.modal-content {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.image-container {
  margin-right: 20px;
}

.film-image {
  max-width: 100%;
  height: auto;
}

.info-container {
  display: flex;
  flex-direction: column;
}

.info-input {
  width: 200px;
  margin-bottom: 10px;
}

.description-textarea {
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 20px;
  padding: 5px;
  margin: 10px;
  color: rgb(219, 219, 219);
  background-color: rgba(238, 237, 237, 0.094);
}
.checkbox-wrapper-5 .check {
  --size: 30px;
  position: relative;
  background: linear-gradient(90deg, #f19af3, #f099b5);
  line-height: 0;
  perspective: 400px;
  font-size: var(--size);
}

.checkbox-wrapper-5 .check input[type="checkbox"],
.checkbox-wrapper-5 .check label,
.checkbox-wrapper-5 .check label::before,
.checkbox-wrapper-5 .check label::after,
.checkbox-wrapper-5 .check {
  appearance: none;
  display: inline-block;
  border-radius: var(--size);
  border: 0;
  transition: 0.35s ease-in-out;
  box-sizing: border-box;
  cursor: pointer;
}

.checkbox-wrapper-5 .check label {
  width: calc(2.2 * var(--size));
  height: var(--size);
  background: #d7d7d7;
  overflow: hidden;
}

.checkbox-wrapper-5 .check input[type="checkbox"] {
  position: absolute;
  z-index: 1;
  width: calc(0.8 * var(--size));
  height: calc(0.8 * var(--size));
  top: calc(0.1 * var(--size));
  left: calc(0.1 * var(--size));
  background: linear-gradient(45deg, #dedede, #ffffff);
  box-shadow: 0 6px 7px rgba(0, 0, 0, 0.3);
  outline: none;
  margin: 0;
}

.checkbox-wrapper-5 .check input[type="checkbox"]:checked {
  left: calc(1.3 * var(--size));
}

.checkbox-wrapper-5 .check input[type="checkbox"]:checked + label {
  background: transparent;
}

.checkbox-wrapper-5 .check label::before,
.checkbox-wrapper-5 .check label::after {
  content: "· ·";
  position: absolute;
  overflow: hidden;
  left: calc(0.15 * var(--size));
  top: calc(0.5 * var(--size));
  height: var(--size);
  letter-spacing: calc(-0.04 * var(--size));
  color: #9b9b9b;
  font-family: "Times New Roman", serif;
  z-index: 2;
  font-size: calc(0.6 * var(--size));
  border-radius: 0;
  transform-origin: 0 0 calc(-0.5 * var(--size));
  backface-visibility: hidden;
}

.checkbox-wrapper-5 .check label::after {
  content: "●";
  top: calc(0.65 * var(--size));
  left: calc(0.2 * var(--size));
  height: calc(0.1 * var(--size));
  width: calc(0.35 * var(--size));
  font-size: calc(0.2 * var(--size));
  transform-origin: 0 0 calc(-0.4 * var(--size));
}

.checkbox-wrapper-5 .check input[type="checkbox"]:checked + label::before,
.checkbox-wrapper-5 .check input[type="checkbox"]:checked + label::after {
  left: calc(1.55 * var(--size));
  top: calc(0.4 * var(--size));
  line-height: calc(0.1 * var(--size));
  transform: rotateY(360deg);
}

.checkbox-wrapper-5 .check input[type="checkbox"]:checked + label::after {
  height: calc(0.16 * var(--size));
  top: calc(0.55 * var(--size));
  left: calc(1.6 * var(--size));
  font-size: calc(0.6 * var(--size));
  line-height: 0;
}
</style>
