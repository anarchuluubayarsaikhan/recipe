<template>
  <div>
    <button @click="loginWithFacebook">Login with Facebook</button>
  </div>
</template>

<script>
import { auth, facebookProvider, signInWithPopup, onAuthStateChanged } from '../firebase';
import { mapGetters } from 'vuex';
import store  from '../store'

export default {
  components: {
  },
  computed: {
    ...mapGetters(['user']),
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.dispatch('updateUser', user);
      } else {
        this.$store.dispatch('logout');
      }
    });
  },
  methods: {
    loginWithFacebook() {
      signInWithPopup(auth, facebookProvider)
        .then((result) => {
          const user = result.user;
          store.commit("setUser", user);
          localStorage.setItem("user", JSON.stringify(user));
          window.location.href = '/';
        })
        .catch((error) => {
          console.error("Error logging in with Facebook: ", error.message);
        });
    }
  },
};
</script>
