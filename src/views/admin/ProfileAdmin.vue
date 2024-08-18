<template>
    <div class="user-profile">
      <div v-if="user" style="color:black">
        <img :src="user.avatar" alt="Avatar" class="avatar" />
        <h2>{{ user.name }}</h2>
        <p>Email: {{ user.email }}</p>
      </div>
      <div v-else>
        <p>Loading user profile...</p>
      </div>
    </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      user: null
    };
  },
  created() {
    this.fetchUserProfile();
  },
  methods: {
    fetchUserProfile() {
      const authUser = JSON.parse(localStorage.getItem('authUser'));

      if (authUser && authUser.user && authUser.user.email) {
        const email = authUser.user.email;
        console.log('Email:', email);

        fetch(`https://lhgkaf7rki.execute-api.us-east-1.amazonaws.com/Prod/user/${email}`)
          .then(response => response.json())
          .then(data => {
            console.log('Response Data:', data);
            this.user = {
              name: data.user.name,
              email: data.user.email,
            };
            console.log('User Data:', this.user);

          })
          .catch(error => console.error('Error fetching user profile:', error));
      } else {
        console.error('No user email found in localStorage');
      }
    },
    getAvatarUrl(avatarId) {
      const baseUrl = 'https://profilephotossispe.s3.us-east-1.amazonaws.com/';
      const avatars = [
        'avatar1.png',
        'avatar2.png',
        'avatar3.png',
        'avatar4.png',
        'avatar5.png'
      ];
      return baseUrl + avatars[avatarId - 1] || 'default-avatar.png';
    }
  }
};
</script>

  <style scoped>
  .user-profile {
    text-align: center;
    margin: 20px;
  }
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  </style>
  