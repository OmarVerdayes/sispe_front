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
      const avatars = [
        'https://profilephotossispe.s3.us-east-1.amazonaws.com/avatar1.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLWVhc3QtMSJGMEQCIGODSWOCH8ndAW5y2Ma28k7wh1OYnc0kLXCJ73RM%2Bx09AiA2BVxu0x8zstehfHqUgsh9Ira88gXjkhd5UUsjOS4lOCrkAggfEAAaDDEzNzIzNzU3MDQ3NyIMMPp1fshNLOeQ%2Bie%2BKsEC%2BcNPXJKNtjue5mNr2KdnAKGuAU1SBB3gvmfRE1kny21SHEM897m4Emu4NANHOtieAo7jj%2BNMv%2FbKoKCTSxGSwnML5xrldlX3Dz1299i9ZIzRj4VbTS1BG5BI95K%2BVYtmDl0FoTNYlKXhnOC9rQDTQdB9obG4AUE5j56TvpmZtu41PQ5vsxS2xkRUSOGTKmIW0HoU%2FyYO9hOy0nrswkXTjW5FLQELaX61gCMt7c0HPc6NoncK0uutXflfWkNjQMaEgxTgqmndik0M8BPnuLoFKkKPO1MB4InLvYOjoqYE7KhRoal8zWiWQZICn%2BXmBg9%2Fc3aGQcyf8sOIfEim6OkTx%2FNbWrlTlCB4O2EMtlubccLojrY5dsCf8zPzy06BtztGADQFTGR3CyhdhgtrrQaJTdIKviQ29O3xoKJs4oXzlTufMK2%2BhLYGOrQCjzRr3zPdHbVcCSFHeO%2BuBLzyYeGVm6EAK%2BK6tjbIfKPRiDX4Yh86BfwvibBZvdYM36%2FTlFkWqilxUal7HIaZmvJLBNjzA7O9UdjTHU4TCOU0kMy5FidKalX2D2wPytMxTr1x3gQX7YV8LY4pP5HRWeO74kCS%2BuhdnKDRH0GA%2BEbg%2BA8kDXGzqe2QnAibzZxfyNHZ2YoE5irixOlqykgMxF3rib%2FtqQMeAF28pTZJAYv1WLmjt3fXW6iXCRTZnS%2Fh0fpOQEbvJsoG6hwYDM3ZNDpsaJRCJH0Ow1HzKVWjJX0Z%2FxBjoL6KqtJXb8T4gA9JvxTqWs0X5NiWTFQOBlaCsURdsFibhdPI5KSbs03v%2FA25gF8e3BBHWZyP%2BVHiMRqOjlT5xzREsuUQtp%2FCTJmMW9g%2BA04%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240817T220923Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAR7477EOW7TBHPREV%2F20240817%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=77c814eb4646f55de1d4a88bf4a2c35afbd01ddb0cd9662764e90741bc4d2711',
        'https://profilephotossispe.s3.us-east-1.amazonaws.com/avatar2.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLWVhc3QtMSJGMEQCIGODSWOCH8ndAW5y2Ma28k7wh1OYnc0kLXCJ73RM%2Bx09AiA2BVxu0x8zstehfHqUgsh9Ira88gXjkhd5UUsjOS4lOCrkAggfEAAaDDEzNzIzNzU3MDQ3NyIMMPp1fshNLOeQ%2Bie%2BKsEC%2BcNPXJKNtjue5mNr2KdnAKGuAU1SBB3gvmfRE1kny21SHEM897m4Emu4NANHOtieAo7jj%2BNMv%2FbKoKCTSxGSwnML5xrldlX3Dz1299i9ZIzRj4VbTS1BG5BI95K%2BVYtmDl0FoTNYlKXhnOC9rQDTQdB9obG4AUE5j56TvpmZtu41PQ5vsxS2xkRUSOGTKmIW0HoU%2FyYO9hOy0nrswkXTjW5FLQELaX61gCMt7c0HPc6NoncK0uutXflfWkNjQMaEgxTgqmndik0M8BPnuLoFKkKPO1MB4InLvYOjoqYE7KhRoal8zWiWQZICn%2BXmBg9%2Fc3aGQcyf8sOIfEim6OkTx%2FNbWrlTlCB4O2EMtlubccLojrY5dsCf8zPzy06BtztGADQFTGR3CyhdhgtrrQaJTdIKviQ29O3xoKJs4oXzlTufMK2%2BhLYGOrQCjzRr3zPdHbVcCSFHeO%2BuBLzyYeGVm6EAK%2BK6tjbIfKPRiDX4Yh86BfwvibBZvdYM36%2FTlFkWqilxUal7HIaZmvJLBNjzA7O9UdjTHU4TCOU0kMy5FidKalX2D2wPytMxTr1x3gQX7YV8LY4pP5HRWeO74kCS%2BuhdnKDRH0GA%2BEbg%2BA8kDXGzqe2QnAibzZxfyNHZ2YoE5irixOlqykgMxF3rib%2FtqQMeAF28pTZJAYv1WLmjt3fXW6iXCRTZnS%2Fh0fpOQEbvJsoG6hwYDM3ZNDpsaJRCJH0Ow1HzKVWjJX0Z%2FxBjoL6KqtJXb8T4gA9JvxTqWs0X5NiWTFQOBlaCsURdsFibhdPI5KSbs03v%2FA25gF8e3BBHWZyP%2BVHiMRqOjlT5xzREsuUQtp%2FCTJmMW9g%2BA04%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240817T220943Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAR7477EOW7TBHPREV%2F20240817%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=bf66278949ba85dae251da44421cb546b7be125c6db0085a508802685d82ce7e',
      ];
      return avatars[avatarId];
    }
  }
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.user-profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0e141e;
  color: white;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
