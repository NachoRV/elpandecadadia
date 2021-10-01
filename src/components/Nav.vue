<template>
  <div id="nav">
    <router-link to="/admin/new">Crear Exposicion</router-link> |
    <router-link to="/admin">Exposiciones</router-link>
  </div>
</template>
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
