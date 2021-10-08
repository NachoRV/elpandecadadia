<template>

    <div class="header">
      <a href="https://www.instagram.com/elpandecadadia.es/" target="_blank">
        <img class="insta" src="../assets/instagram.png" alt="insta" />
        <span>
          elpandecadadia.es
        </span>
      </a>
    </div>
    <nav>
      <ul>
        <li
          v-for="(album, index) in albums"
          :key="album.titulo"
          :class="{ selected: selectAlbumTitle === album.titulo }"
        >
          <span @click="select(index, album.titulo)">{{ album.titulo }}</span>
        </li>
      </ul>
    </nav>

  <section v-if="selectAlbum !== null" class="main">
    <div v-for="(img, index) in albums[selectAlbum].img" :key="img.url" class="gallery__item">
      <img
        class="gallery__img"
        :src="img.url"
        :alt="img.url"
        @click="selectItem(albums[selectAlbum].img, index)"
      />
    </div>
  </section>
  <teleport to="body" v-if="showLightbox">
    <lightbox :index="lightboxIndex" :imgs="lightboxImgs" @close="close" />
  </teleport>
</template>
<script>
import { onMounted, ref } from 'vue';
import { db, st } from '../firebase';
import Lightbox from '../components/Lightbox.vue';

export default {
  components: { Lightbox },
  name: 'Home',
  setup() {
    const albums = ref([]);
    const selectAlbum = ref(null);
    const showUpdateBtn = ref(false);
    const selectAlbumTitle = ref(null);
    const lightboxImgs = ref([]);
    const lightboxIndex = ref(0);
    const showLightbox = ref(false);

    const layout = () => {
      const numOfImg = albums.value[selectAlbum.value].img.length;
      let numOfLines = numOfImg / 4;
      const resto = parseInt(numOfLines.toString().split('.')[1], 10);
      if (resto) numOfLines = Math.trunc(numOfLines) + 1;
      // switch(restt) {
      //  case 25:
      // }
    };
    const close = () => {
      console.log('close');
      showLightbox.value = false;
      lightboxImgs.value = [];
      lightboxIndex.value = 0;
    };

    const select = (i, title) => {
      if (i === selectAlbum.value) {
        selectAlbum.value = null;
        selectAlbumTitle.value = null;
        return;
      }
      selectAlbumTitle.value = title;
      selectAlbum.value = i;
      console.log(selectAlbumTitle.value);
      layout();
    };

    const selectItem = (array, i) => {
      console.log(array, i);
      lightboxImgs.value = array;
      lightboxIndex.value = i;
      showLightbox.value = true;
    };
    const deleteImg = (img, i) => {
      const desertRef = st.ref().child(img);
      desertRef
        .delete()
        .then(() => {
          // File deleted successfully
          console.log('borrada');
          albums.value[selectAlbum.value].img.splice(i, 1);
          console.log(albums.value);
          db.collection('Albums')
            .doc(albums.value[selectAlbum.value].titulo)
            .set(albums.value[selectAlbum.value])
            .then(() => {
              console.log('Document successfully written!');
            })
            .catch((error) => {
              console.error('Error writing document: ', error);
            });
        })
        .catch((error) => {
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
      db.collection('Albums')
        .doc(albums.value[selectAlbum.value].titulo)
        .set(albums.value[selectAlbum.value])
        .then(() => {
          console.log('Document successfully written!');
          showUpdateBtn.value = false;
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    };

    const deletePictures = (title) => {
      albums.value.forEach((album) => {
        console.log(album.titulo, title);
        if (album.titulo === title) {
          album.img.forEach((img, i) => {
            deleteImg(img.name, i);
          });
        }
      });
    };

    const getAlbums = () => {
      albums.value = [];
      db.collection('Albums')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            albums.value.push(doc.data());
          });
        });
    };

    const deleteAlbum = () => {
      db.collection('Albums')
        .doc(selectAlbumTitle.value)
        .delete()
        .then(() => {
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
      selectItem,
      lightboxImgs,
      lightboxIndex,
      showLightbox,
      close,
    };
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: baseline;
  position: relative;
  height: 150px;
  a {
    text-decoration: none;
    align-items: center;
    color: black;
    font-weight: bold;
    font-size: 40px;
    height: 100%;
    display: flex;
  }
}
ul {
  list-style: none;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  border-bottom: .3px solid rgb(218, 216, 216);

  li {
    font-weight: bold;
    cursor: pointer;
    margin: 0 1rem;
  }

  .selected {
    border-bottom: 3px solid #42b983;;
    color: #42b983;
  }
}
.insta {
  width: 24px;
  height: 24px;
  margin-right: 3px;
}
.main {
  margin: auto;
  // padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}
.gallery__item {
  width: 45vw;
  max-height: 400px;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}
.gallery__img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 5px 5px rgb(95, 94, 94);
  }
}

</style>
