<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
        <input v-model="user" type="text" placeholder="Usuario">
        <input v-model="password" type="password" placeholder="Cpntraseña">
        <input type="submit" value="login">
    </form>
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
      console.log(user.value, password.value);
      firebase
        .auth()
        .signInWithEmailAndPassword(user.value, password.value)
        .then((data) => {
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
