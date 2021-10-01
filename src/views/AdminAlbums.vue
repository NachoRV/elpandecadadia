<template>
<Nav />
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
<div class="btn-row" v-if="selectAlbum !== null">
  <button @click="deleteAlbum()" class="drop">Borrar</button>
  <button v-if="showUpdateBtn" @click="update" class="update">Guardar</button>
</div>
<section v-if="selectAlbum !== null" class="main">
  <ImgCardAdmin
    v-for="(img, index) in albums[selectAlbum].img"
    :key="img.url"
    :img="img"
    :index="index"
    @deleteImg="deleteImg"
    @setTitle="setTitle"
    @setDescription="setDescription"
  />
</section>
</template>
<script>
import { onMounted, ref } from 'vue';
import { db, st } from '../firebase';
import ImgCardAdmin from '../components/ImgCardAdmin.vue';
import Nav from '../components/Nav.vue';

export default {
  components: { ImgCardAdmin, Nav },
  name: 'AdminAlbums',
  setup() {
    // st.ref().getDownloadURL();
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
.main {
  display: flex;
  flex-direction: row;
  gap: 5rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 2rem 0;
}
.delete-album {
  background-color: red;
  border-radius: 50%;
  color: white;
  width: 30px;
  height:  30px;
}

ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
  margin: 3rem;

  li {
    font-weight: bold;
  }

  .selected {
    border-bottom: 2px solid black;
  }
}

.btn-row {
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    padding: 0.5rem;
    min-width: 8rem;
    color: white;
    border-radius: 5px;
    margin-right:1rem;

    &:hover {
      cursor: pointer;
    //   box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    //    rgba(0, 0, 0, 0.12) 0px -12px 30px,
    //    rgba(0, 0, 0, 0.12) 0px 4px 6px,
    //    rgba(0, 0, 0, 0.17) 0px 12px 13px,
    //    rgba(0, 0, 0, 0.09) 0px -3px 5px;
    box-shadow: 1px 1px 9px 0px  rgba(0, 0, 0, 0.877) ;
    }
  }

  .drop {
    background-color: rgba(150, 4, 4, 0.788);
    border: 1px solid rgba(94, 2, 2, 0.596);
  }

  .update {
    background-color: rgba(1, 145, 20, 0.747);
    border: 1px solid rgba(3, 112, 17, 0.993);
  }

}
</style>
