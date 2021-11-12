<template>
  <nav :style="{ height:h}">
    <ul>
      <li
        v-for="(album, index) in albums"
        :key="album.titulo"
        :class="{ selected: selectAlbumTitle === album.titulo }"
        @click="select(index, album.titulo)"
      >
        <span>{{ album.titulo }}</span>
      </li>
    </ul>
    <div class="icons-nav">
      <img
        @click="goHome"
        class="insta" src="../assets/home.svg"
        alt="insta" width="20"
      />
      <a href="https://www.instagram.com/elpandecadadia.es/" target="_blank">
        <img class="insta" src="../assets/instagram.svg" alt="insta" width="20" />
      </a>
    </div>
    <Avatar class="avatar" />
  </nav>
</template>
<script>
import { onBeforeMount, ref } from 'vue';
import Avatar from './Avatar.vue';

export default {
  name: 'PublicNav',
  components: { Avatar },
  props: {
    albums: {
      type: Array,
      default: () => [],
    },
    selectAlbumTitle: {
      type: String,
      default: '',
    },
  },
  emits: ['selectAlbum'],
  setup(props, { emit }) {
    let albumTitle;
    let index;
    const h = ref('300');
    const goHome = () => {
      albumTitle = null;
      index = null;
      emit('selectAlbum', index, albumTitle);
    };
    const select = (i, title) => {
      albumTitle = title;
      index = i;
      emit('selectAlbum', i, title);
    };
    const size = () => {
      h.value = `${(window.innerWidth * 22.45) / 100}px`;
    };
    onBeforeMount(() => {
      window.addEventListener('resize', size);
    });
    return {
      select,
      goHome,
      h,
    };
  },
};
</script>
<style lang="scss" scoped>
nav {
  position: relative;
  height: 236.39849999999998px;
  display: flex;
  align-items: flex-end;
}
.icons-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 1rem;
  right: 2rem;
  cursor: pointer;
  img {
    margin-left: 1rem;
  }
  a {
    display: flex;
  }
}
ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0px;

  li {
    font-weight: bold;
    cursor: pointer;
    margin: 0 1rem;
    padding: 1rem 2rem;
    border-radius: 5px 5px 0 0;
    color: var(--white);
    border-bottom: 5px solid transparent;
  }
  li:hover {
    color: var(--black);
    background-color: var(--grey);
    border-bottom: 5px solid transparent;
  }

  .selected {
    border-radius: 0px;
    border-bottom: 5px solid var(--white);
    color: var(--white);
  }
}

.avatar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
