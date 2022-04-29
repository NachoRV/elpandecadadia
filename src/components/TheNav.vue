<template>
  <nav class="nav">
    <div class="logo">elpandecadadia.es</div>
    <div class="nav-links" ref="navLink">
      <ul class="items">
        <li class="item" v-for="(album, index) in albums" :key="album.titulo"
          :class="{ selected: selectAlbumTitle === album.titulo }" @click="select(index, album.titulo)">
          {{ album.titulo }}
        </li>
      </ul>
      <div class="social">

        <img @click="goHome" class="insta" src="../assets/home.svg" alt="insta" width="30" />

        <a href="https://www.instagram.com/elpandecadadia.es/" target="_blank">
          <img class="insta" src="../assets/instagram.svg" alt="insta" width="30" />
        </a>
      </div>
    </div>
    <div class="btn-menu" @click="showMenu">
      <img class="insta" src="../assets/menu.svg" alt="insta" width="30" fill="white" />
    </div>
  </nav>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue';

defineProps({
  albums: {
    type: [Array, Object],
    default: () => { },
  },
  selectAlbumTitle: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['selectAlbum']);
const navLink = ref(null);

const select = (i, title) => {
  emit('selectAlbum', i, title);
  showMenu()
};
const goHome = () => {
  emit('selectAlbum', null, null);
};

function showMenu() {
  navLink.value.classList.toggle('show');
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--main-color);
  color: var(--white);
  height: 65px;
  padding: 0 30px;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.6);
}

.nav-links {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.logo {
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
}

.items {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
}

.items li {
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;
  text-transform: uppercase;
}

.items li:hover,
.selected {
  background-color: var(--secondary-color);
  border-radius: 5px;
}

.nav-links {
  display: flex;
}

.social a {
  display: inline-block;
  margin: 0 10px;
  cursor: pointer;
}

.btn-menu {
  display: none;
}

@media screen and (max-width: 1200px) {

  .nav-links {
    visibility: hidden;
    flex-direction: column;
    position: absolute;
    top: 65px;
    right: 0;
    opacity: 0;
    height: calc(100% - 65px);
    background-color: var(--black);
    transition: all 1s;
    padding: 10px 0;
  }

  .show {
    visibility: visible;
    opacity: 1;
    box-shadow: -3px 0px 3px 0px rgba(0, 0, 0, 0.6);
    ;
  }

  .items {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    height: 100%;
    padding: 0;
  }

  .btn-menu {
    display: flex;
  }

}
</style>
