<template>

  <router-view/>
</template>

<style lang="scss">

:root {
  --gap-img: 0.8em;
}

html {
  box-sizing: border-box;
    /* 1rem = 10px */
  font-size: 62.5%;
}
*, *:before, *:after {
  box-sizing: inherit;
}

body {
  font-size: 1.6rem;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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

.btn {
  background-color: #42b983d0;
  padding: .5rem;
  border: 1px solid #42b983;
  border-radius: 5px;
  width: 20rem;
  height: 3rem;
  color: rgba(255, 255, 255, 0.884);
  font-weight: bold;
  font-size: 1.5rem;
}

.btn:hover {
  cursor: pointer;
  background-color: #328f65d0;
  box-shadow: 0 2px 5px black;
}

</style>
