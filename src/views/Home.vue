<template>
  <PublicNav
    :albums="albums"
    :selectAlbumTitle="selectAlbumTitle"
    @selectAlbum="select"
  />
  <Avatar v-if="selectAlbum === null"/>
  <Masonry
    v-else
    :album="albums[selectAlbum]"
    @selectItem="selectItem"
  />
  <teleport to="body" v-if="showLightbox">
    <lightbox
      :index="lightboxIndex"
      :imgs="lightboxImgs"
      @close="close"
    />
  </teleport>
</template>
<script>
import { onMounted, ref } from 'vue';
import { db, st } from '@/firebase';
import Lightbox from '@/components/Lightbox.vue';
import PublicNav from '@/components/PublicNav.vue';
import Masonry from '@/components/Masonry.vue';
import Avatar from '@/components/Avatar.vue';

export default {
  components: {
    Lightbox, PublicNav, Masonry, Avatar,
  },
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

</style>
