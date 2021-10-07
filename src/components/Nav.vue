<template>
  <div id="nav">
    <router-link to="/admin/new">Crear Exposicion</router-link> |
    <router-link to="/admin">Exposiciones</router-link>
    <button @click="logout">logOut</button>
  </div>
</template>
<script>
import firebase from 'firebase';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const logout = () => {
      firebase.auth().signOut();
      store.commit('LOGOUT_USER');
      router.push('/login');
    };
    return {
      logout,
    };
  },
};
</script>
<style lang="scss" scoped>
#nav {
  padding: 30px;

a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
