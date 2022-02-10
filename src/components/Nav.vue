<template>
  <div id="nav">
    <div>
      <router-link to="/admin/new">Crear Exposición</router-link> |
      <router-link to="/admin">Exposiciones</router-link>
    </div>
    <button @click="logout">
       <img class="insta" src="../assets/exit.svg" alt="insta" width="20" />
       salir
    </button>
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
      document.cookie = 'isAuthenticated=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
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
  display: flex;
  justify-content: space-between;
  background-color: var(--main-color);
  columns: var(--white);

a {
    font-weight: bold;
    color: var(--green);

    &.router-link-exact-active {
      color: var(--green);
      border-bottom: 3px solid var(--green);
    }
  }
}

button {
  display: flex;
  justify-content: space-between;
  gap: .5rem;
  align-items: center;
  border: none;
  background: transparent;
  color: var(--green);
  cursor: pointer;
  font-size: 1.6rem;
}
</style>
