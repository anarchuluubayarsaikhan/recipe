<template>
  <div>
    <button @click="loginWithFacebook">Login with Facebook</button>

    <div v-if="user">
      <h3>Welcome, {{ user.displayName }}</h3>
      <img :src="user.photoURL" alt="Profile picture" />
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { auth, facebookProvider, signInWithPopup, signOut, onAuthStateChanged } from '../firebase';

export default {
  data() {
    return {
      user: null
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    loginWithFacebook() {
      signInWithPopup(auth, facebookProvider)
        .then((result) => {
          this.user = result.user;
        })
        .catch((error) => {
          console.error("Error logging in with Facebook: ", error.message);
        });
    },
    logout() {
      signOut(auth)
        .then(() => {
          this.user = null;
        })
        .catch((error) => {
          console.error("Error logging out: ", error.message);
        });
    }
  }
};
</script>

<style scoped>
</style>
