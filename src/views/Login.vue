<template>
  <div class="container">
    <div class="card">
      <a href="https://www.elpandecadadia.es/">
      <h2>elpandecadadia.es</h2>
      </a>
      <form @submit.prevent="login">
        <div>
          <input v-model="user" type="text" placeholder="Usuario" />
        </div>
        <div>
           <input v-model="password" type="password" placeholder="Contraseña" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import firebase from 'firebase';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const user = ref('');
    const password = ref('');
    const store = useStore();
    const router = useRouter();

    const login = () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.value, password.value)
        .then((data) => {
          document.cookie = `isAuthenticated=${JSON.stringify(data)}`;
          console.log(data);
          store.dispatch('fetchUser', data);
          router.push('/admin/new');
        })
        .catch((error) => console.log('error', error));
    };
    return {
      user,
      password,
      login,
    };
  },
};
</script>
<style lang="scss" scoped>
input {
  display: block;
  width: 100%;
  padding: 5px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

form {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}
.card {
  display: flex;
  flex-direction: column;
  border: 1px solid #161616;
  border-radius: 5px;
  padding: 2rem 5rem;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
</style>
