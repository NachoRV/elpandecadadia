<template>

    <div class="header">
      <a href="https://www.instagram.com/elpandecadadia.es/" target="_blank">
        <img class="insta" src="../assets/instagram.png" alt="insta" />
        <span>
          elpandecadadia.es
        </span>
      </a>
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
    </div>

  <section class="section__masonry" v-if="selectAlbum !== null">
    <div class="section__masonry-wrapper">
      <div class="section__masonry-wrapper__item"
        v-for="(img, index) in albums[selectAlbum].img"
        :key="img.url"
        @click="selectItem(albums[selectAlbum].img, index)"
        >
        <img :src="img.url" alt=""
          class="section__masonry-wrapper__item-img
        ">
      </div>

    </div>
    <!--Masonry-wrapper-->
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
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
  position: relative;
  height: 300px;
  background: url('../assets/IMG_1288.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  justify-content: center;
  align-items: center;
  color: white;
  a {
    text-decoration: none;
    align-items: center;
    color: white;
    font-weight: bold;
    font-size: 40px;
    height: 100%;
    display: flex;
  }
}
ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 0px;

  li {
    font-weight: bold;
    cursor: pointer;
    margin: 0 1rem;
  }

  .selected {
    border-bottom: 3px solid white;
    color: white;
  }
}
.insta {
  width: 24px;
  height: 24px;
  margin-right: 3px;
}

.section__masonry {
  display: flex;
  justify-content: center;
  margin-top: 5em;
}

.section__masonry-wrapper {
  width: 576px;
  columns: 2;
  padding-right: var(--gap-img);
  padding-left: var(--gap-img);
}

.section__masonry-wrapper__item {
  width: 100%;
  cursor: pointer;
}
.section__masonry-wrapper__item :hover {
  opacity: 0.6;
  transition: 0.5s;
}
.section__masonry-wrapper__item-img {
  width: 100%;
  height: auto;
  margin-bottom: var(--gap-img);
}

@media (min-width: 768px) {
  .section__masonry-wrapper {
    columns: 3;
    width: 970px;
  }
}

@media (min-width: 992px) {
  .section__masonry-wrapper {
    columns: 3;
  }
}

</style>
