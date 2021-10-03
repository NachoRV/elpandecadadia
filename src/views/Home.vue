<template>
<div class="header">
  <h1>El Pan de Cada día</h1>
  <a href="https://www.instagram.com/elpandecadadia.es/" target="_blank">
    <img class="insta"  src="../assets/instagram.png" alt="insta">
  </a>
</div>
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
    v-for="(img, index) in albums[selectAlbum].img"
    :key="img.url"
    class="gallery__item"
  >
    <img
      class="gallery__img"
      :src="img.url"
      :alt="img.url"
      @click="selectItem(albums[selectAlbum].img, index)"
    >
  </div>
</section>
<teleport to="body" v-if="lightboxImgs.length >0">
  <lightbox
  :index="lightboxIndex"
  :imgs="lightboxImgs"
  @close="close"
  />
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
      lightboxImgs.value = [];
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
      selectItem,
      lightboxImgs,
      lightboxIndex,
      close,
    };
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
ul {
  list-style: none;
  display: flex;
  justify-content: center;
  margin: 10px;
  li {
    font-weight: bold;
    cursor: pointer;
    margin: 0 1rem;
  }

  .selected {
    border-bottom: 2px solid black;
  }
}
.insta {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 5px;
  right: 5px;
}
.main {
  margin: auto;
  padding: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}
.gallery__item {
   margin: 0 2px 2px 2px;
}
.gallery__img {
   width: auto;
   height: 250px;
   object-fit: cover;
   cursor: pointer;

   &:hover {
     box-shadow: 0px 0px 5px 5px rgb(95, 94, 94);
   }
}

// .main {
//   padding: 1rem;
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   grid-auto-rows: 200px;
//   grid-gap: 2px;
// }

// .gallery__img {
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// }

// .gallery__item:nth-child(5) {
//   grid-column-start: span 2;
// }
// .gallery__item:nth-child(7) {
//   grid-row-start: span 2;
// }

// @media (max-width: 768px) {
//   .main {
//     grid-template-columns: repeat(3, 1fr);
//   }
// }
// @media (max-width: 600px) {
//   .main {
//     grid-template-columns: repeat(2, 1fr);
//   }
// }
// @media (max-width: 500px) {
//    .main {
//       display: flex;
//       flex-direction: column;
//   }
// }
</style>
