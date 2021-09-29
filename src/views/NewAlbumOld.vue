<template>
<nav>
  <ul>
    <li v-for="(album, index) in albums" :key="album.titulo" @click="select(index)">
      {{ album.titulo }}
      <span @click="deleteAlbum(album.titulo)">borrar</span>
    </li>
  </ul>
</nav>
<section v-if="selectAlbum !== null" class="main">
  <ImgCardAdmin
    v-for="(img, index) in albums[selectAlbum].img"
    :key="img.url"
    :img="img"
    :index="index"
    @deleteImg="deleteImg" />
</section>
</template>
<script>
import { onMounted, ref } from 'vue';
import { db, st } from '../firebase';
import ImgCardAdmin from '../components/ImgCardAdmin.vue';

export default {
  components: { ImgCardAdmin },
  setup() {
    // st.ref().getDownloadURL();
    const albums = ref([]);
    const selectAlbum = ref(null);

    const select = (i) => {
      if (i === selectAlbum.value) {
        selectAlbum.value = null;
        return;
      }
      selectAlbum.value = i;
    };
    const deleteImg = (img, i) => {
      const desertRef = st.ref().child(img);
      desertRef.delete().then(() => {
        // File deleted successfully
        console.log('borrada');
        albums.value[selectAlbum.value].img.splice(i, 1);
      }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
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

    const deleteAlbum = (album) => {
      db.collection('Albums').doc(album).delete().then(() => {
        deletePictures(album);
        getAlbums();
        console.log('Document successfully deleted!');
      })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    };

    onMounted(async () => {
      await getAlbums();

      // const listRef = st.ref().child('img');
      // listRef.listAll().then((res) => {
      //   console.log(res.items);
      //   res.items.forEach(async (item) => {
      //     const url = await item.getDownloadURL();
      //     console.log(url);
      //   });
      // });
    });
    return {
      albums,
      selectAlbum,
      select,
      deleteImg,
      deleteAlbum,
    };
  },
};
</script>
<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: row;
  gap: 5rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 2rem 0;
}
</style>
