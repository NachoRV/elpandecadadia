<template>
  <div class="container">
    <div class="title">
      <!-- <label for="titulo">Título: </label> -->
      <input type="text" v-model="album.titulo" placeholder="Ttulo de la exposición" />
    </div>
    <Upload v-if="album.titulo" :album="album.titulo" @save="save" />
    <section class="album-data">
      <div class="img-card" v-for="(img, index) in album.img" :key="img">
        <img :src="img.url" alt="foto" />
        <button @click="deleteImg(img.name, index)"> borrar</button>
        <input type="text" v-model="img.title" placeholder="titulo"/>
        <input type="text" v-model="img.description" placeholder="Descripció" />
        <button @click="saveAlbum"> Crear Album</button>
      </div>
    </section>
  </div>
</template>
<script>
// @ is an alias to /src
import Upload from '@/components/Upload.vue';
import { ref } from 'vue';
import { db, st } from '../firebase';
// import { onMounted, ref } from 'vue';
// import { useRoute } from 'vue-router';

export default {
  name: 'NewAlbum',
  components: {
    Upload,
  },
  setup() {
    // const route = useRoute();
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
      console.log(album.value);
    };
    const saveAlbum = () => {
      console.log(album.value);
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
    };
  },
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 1rem;
  background-color: beige;
  height: 100%;
}

.album-data {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.title {
  margin-bottom: 2rem;

  input {
    width: 50%;
    background-color: transparent;
    font-size: 2rem;
  }

  input:focus {
    border-bottom: 2px solid blue;
    outline: none;
  }
}
input {
  border: none;
  border-bottom: 1px solid blue;
}

.img-card {
  display: flex;
  img {
    width: 100px;
    height: 100px;
  }
}
</style>
