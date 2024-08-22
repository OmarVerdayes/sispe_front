<template>
  <div class="about">
    <div class="user-profile">
    <div v-if="user" class="profile-content">
      <div class="avatar-wrapper">
        <img :src="avatarUrl" alt="Avatar" class="avatar" />
        <button @click="toggleAvatarSelection" class="edit-button"><b-icon icon="pencil-fill"></b-icon></button>
      </div>
      <div class="user-info">
        <h2 class="name">{{ user.name }}</h2>
        <p class="email">Email: {{ user.email }}</p>
      </div>
    </div>
    <div v-if="showAvatarSelection" class="avatar-selection">
      <div v-for="(avatar, index) in avatars" :key="index" class="avatar-option">
        <img :src="avatar" @click="updateAvatar(avatar)" class="avatar-small" />
      </div>
    </div>
  </div>
    <div class="title-content">
      <h1 class="title">Mi lista</h1>
    </div>
    <div class="favorites-list">
      <LoadAnimation v-if="loading" />
      <div v-else-if="favorites.length === 0" class="no-favorites">
        No tienes películas favoritas.
      </div>
      <div v-else class="movies">
        <div v-for="movie in favorites" :key="movie.film_id" class="movie-item">
          <img @click="navigateToMovie(movie.film_id)" :src="movie.front_page" style="width:250px ; height:150px" alt="Poster" class="movie-poster" />
          <h3 class="movie-title">{{ movie.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import LoadAnimation from '../load/load.vue';
import Swal from 'sweetalert2';

export default {
  components: {
    LoadAnimation,
  },
  data() {
    return {
      favorites: [],
      loading: true,
      user: null,
      avatarUrl: '', 
      avatars: [
        'https://profilephotossispe.s3.amazonaws.com/wallE.png',
        'https://profilephotossispe.s3.amazonaws.com/avatar1.png',
        'https://profilephotossispe.s3.amazonaws.com/avatar3.png',
        'https://profilephotossispe.s3.amazonaws.com/avatar2.png',
        'https://profilephotossispe.s3.amazonaws.com/avatar4.png',
        'https://profilephotossispe.s3.amazonaws.com/avatar6.png',
        'https://profilephotossispe.s3.amazonaws.com/avatar5.png',
        'https://profilephotossispe.s3.amazonaws.com/avatar7.png'
      ],
      showAvatarSelection: false
    };
  },
  created() {
    this.loadFavorites();
    this.fetchUserProfile();
    this.loadAvatar();
  },
  methods: {
    navigateToMovie(filmId) {
    this.$router.push({ name: 'movie-view', params: { id: filmId } });
  },
    fetchUserProfile() {
      const authUser = JSON.parse(localStorage.getItem('authUser'));

      if (authUser && authUser.user && authUser.user.email) {
        const email = authUser.user.email;
        fetch(`https://lhgkaf7rki.execute-api.us-east-1.amazonaws.com/Prod/user/${email}`)
          .then(response => response.json())
          .then(data => {
            this.user = {
              name: data.user.name,
              email: data.user.email,
            };
          })
          .catch(error => console.error('Error fetching user profile:', error));
      } else {
        console.error('No user email found in localStorage');
      }
    }, 
    toggleAvatarSelection() {
      this.showAvatarSelection = !this.showAvatarSelection;
    },
    updateAvatar(url) {
      this.avatarUrl = url;
      this.showAvatarSelection = false;
      this.saveAvatar(url);
    },
    loadAvatar() {
      const savedAvatar = localStorage.getItem('userAvatar');
      if (savedAvatar) {
        this.avatarUrl = savedAvatar;
      } else {
        this.avatarUrl = 'https://profilephotossispe.s3.us-east-1.amazonaws.com/default-avatar.png'; // Imagen por defecto
      }
    },
    saveAvatar(url) {
      localStorage.setItem('userAvatar', url);
    },
    async loadFavorites() {
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      const userId = authUser.user ? authUser.user.id.toUpperCase() : null;

      if (!userId) {
        this.loading = false;
        return;
      }

      try {
        const response = await axios.get(
          `https://qhl0fcehdg.execute-api.us-east-1.amazonaws.com/Prod/favorites/${userId}`
        );
        this.favorites = response.data;
      } catch (error) {
        console.error("Error al cargar la lista de favoritos:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>

.user-profile {
  margin: 20px;
}
.profile-content {
  display: flex;
  align-items: center;
  color: black;
}

.avatar-wrapper {
  display: inline-block;
  position: relative;
  align-items: center;
  margin-right: 20px;}

.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.edit-button {
  position: absolute;
  bottom: 10px; 
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5); 
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px; 
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.user-info {
  display: flex;
  flex-direction: column;
  color:white;
}
.name {
  font-size: 3.5em;
  margin: 0;
  color:white;
}

.email {
  font-size: 1.0em;
  margin: 0;
}
.avatar-selection {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.avatar-option {
  margin-right: 10px;
  cursor: pointer;
}

.avatar-small {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.about {
  background-color: #00050D;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  color: white;
}

.favorites-list {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.no-favorites {
  color: white;
}

.movies {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.movie-item {
  background-color: #1a1a1a;
  border-radius: 10px;
  padding: 15px;
  width: 300px;
  text-align: center;
  color: white;
}

.movie-poster {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.movie-title {
  margin-top: 10px;
  font-size: 18px;
}

.movie-description {
  margin-top: 5px;
  font-size: 14px;
  color: #ccc;
}
</style>
