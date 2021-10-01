<template>
<nav>
  <ul>
    <li
      v-for="(album, index) in albums"
      :key="album.titulo"
      :class="{selected: selectAlbumTitle === album.titulo}"
    >
      <span @click="select(index, album.titulo )">{{ album.titulo }}</span>
    </li>
  </ul>
</nav>
<section v-if="selectAlbum !== null" class="main">
  <div
    v-for="(img) in albums[selectAlbum].img"
    :key="img.url"
    class="gallery__item"
  >
    <img
      class="gallery__img"
      :src="img.url"
      :alt="img.url"
    >
  </div>
</section>
</template>
<script>
import { onMounted, ref } from 'vue';
import { db, st } from '../firebase';

export default {
  name: 'Home',
  setup() {
    const albums = ref([]);
    const selectAlbum = ref(null);
    const showUpdateBtn = ref(false);
    const selectAlbumTitle = ref(null);

    const select = (i, title) => {
      if (i === selectAlbum.value) {
        selectAlbum.value = null;
        selectAlbumTitle.value = null;
        return;
      }
      selectAlbumTitle.value = title;
      selectAlbum.value = i;
      console.log(selectAlbumTitle.value);
    };
    const deleteImg = (img, i) => {
      const desertRef = st.ref().child(img);
      desertRef.delete().then(() => {
        // File deleted successfully
        console.log('borrada');
        albums.value[selectAlbum.value].img.splice(i, 1);
        console.log(albums.value);
        db.collection('Albums').doc(albums.value[selectAlbum.value].titulo).set(albums.value[selectAlbum.value]).then(() => {
          console.log('Document successfully written!');
        })
          .catch((error) => {
            console.error('Error writing document: ', error);
          });
      }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
    };
    const setTitle = (title, i) => {
      albums.value[selectAlbum.value].img[i].title = title;
      showUpdateBtn.value = true;
    };
    const setDescription = (description, i) => {
      console.log(description, i);
      albums.value[selectAlbum.value].img[i].description = description;
      showUpdateBtn.value = true;
    };

    const update = () => {
      db.collection('Albums').doc(albums.value[selectAlbum.value].titulo).set(albums.value[selectAlbum.value]).then(() => {
        console.log('Document successfully written!');
        showUpdateBtn.value = false;
      })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    };

    const deletePictures = (title) => {
      let albumIndex;
      albums.value.forEach((album, index) => {
        console.log(album.titulo, title);
        if (album.titulo === title) {
          albumIndex = index;
          album.img.forEach((img, i) => {
            deleteImg(img.name, i);
          });
        }
      });
      console.log(albums.value, albumIndex);
    };

    const getAlbums = () => {
      albums.value = [];
      db.collection('Albums').get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            albums.value.push(doc.data());
          });
        });
    };

    const deleteAlbum = () => {
      db.collection('Albums').doc(selectAlbumTitle.value).delete().then(() => {
        deletePictures(selectAlbumTitle.value);
        getAlbums();
        console.log('Document successfully deleted!');
      })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    };

    onMounted(async () => {
      await getAlbums();
    });
    return {
      albums,
      selectAlbum,
      select,
      deleteImg,
      deleteAlbum,
      update,
      setTitle,
      setDescription,
      showUpdateBtn,
      selectAlbumTitle,
    };
  },
};
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
  margin: 3rem;

  li {
    font-weight: bold;
    cursor: pointer;

  }

  .selected {
    border-bottom: 2px solid black;
  }
}
.main {
  max-width: 90vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 150px;
  grid-gap: 2px;

}

.gallery__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery__item:nth-child(5) {
  grid-column-start: span 2;
}
.gallery__item:nth-child(7) {
  grid-row-start: span 2;
}
</style>
