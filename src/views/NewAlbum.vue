<template>
  <div class="container">
    <span class="error" v-if="hasError">* Falta el título de la exposicion </span>
    <div class="title">
      <input
        type="text"
        v-model="album.titulo"
        placeholder="Ttulo de la exposición"
        @change="showError" />
    </div>
    <Upload :album="album.titulo" @save="save" />
    <section class="album-data">
      <img-card-admin
        v-for="(img, index) in album.img"
        :key="img"
        :img="img"
        :index="index"
        @setTitle="setTitle($event, index)"
        @setDescription="setDescription($event, index)">
      </img-card-admin>
    </section>
    <button class="btn" v-if="album.img.length > 0" @click="saveAlbum"> Crear Album</button>
  </div>
</template>
<script>
// @ is an alias to /src
import Upload from '@/components/Upload.vue';
import ImgCardAdmin from '@/components/ImgCardAdmin.vue';
import { ref } from 'vue';
import { db, st } from '../firebase';

// import { onMounted, ref } from 'vue';
// import { useRoute } from 'vue-router';

export default {
  name: 'NewAlbum',
  components: {
    Upload,
    ImgCardAdmin,
  },
  setup() {
    // const route = useRoute();
    const hasError = ref(false);
    const titulo = ref('');
    const album = ref({
      titulo: '',
      img: [],
    });

    const save = (e) => {
      album.value.img.push({
        url: e.url,
        name: e.name,
        title: '',
        description: '',
      });
    };
    const saveAlbum = () => {
      if (album.value.titulo === '') {
        hasError.value = true;
        return;
      }

      db.collection('Albums').doc(album.value.titulo).set(album.value).then(() => {
        console.log('Document successfully written!');
      })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    };

    const deleteImg = (img, i) => {
      const desertRef = st.ref().child(img);
      desertRef.delete().then(() => {
        // File deleted successfully
        console.log('borrada');
        album.value.img.splice(i, 1);
      }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
    };
    const setDescription = (description, i) => {
      console.log(description, i);
      album.value.img[i].description = description;
      console.log(album.value.img[i]);
    };

    const setTitle = (title, i) => {
      album.value.img[i].title = title;
    };

    const showError = () => {
      if (album.value.titulo !== '') {
        hasError.value = false;
      }
    };
    // onMounted(() => {
    //   if (route.params.album !== undefined && route.params.album !== '') {
    //     album.value = route.params.album;
    //     console.log(route.params.album);
    //   }
    // });
    return {
      album,
      titulo,
      save,
      saveAlbum,
      deleteImg,
      setDescription,
      setTitle,
      hasError,
      showError,
    };
  },
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 1rem;
  height: 100%;
  position: relative;
}

.error {
  color: red;
  margin: .5rem;
  font-weight: bold;
  position: absolute;
  right: 5px;
}
.album-data {
  display: flex;
  gap: 5rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 2rem 0;
}
.title {
  margin-bottom: 4rem;

  input {
    width: 50%;
    background-color: transparent;
    font-size: 3rem;
    font-weight: bold;
    border: none;
    text-align: center;
  }

  input:focus {
    border-bottom: 2px solid black;
    outline: none;
  }
}

</style>
