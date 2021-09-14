<template>
  <div class="container">
    <Upload :album="album.titulo" @save="save" />
    <section class="album-data">
      <div class="title">
        <label for="titulo">Título: </label>
        <input type="text" v-model="album.titulo" placeholder="Titulo de la exposición" />
      </div>
      <div class="img-card" v-for="img in album.img" :key="img">
        <img :src="img.url" alt="foto" />
        <input type="text" v-model="img.title" />
        <input type="text" v-model="img.description" />
      </div>
    </section>
  </div>
</template>
<script>
// @ is an alias to /src
import Upload from '@/components/Upload.vue';
import { ref } from 'vue';
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
      album.value.img = [];
      console.log(album.value.img);
      console.log(e);
      e.forEach((element) => {
        album.value.img.push({
          url: element,
          title: 'Título',
          description: 'Descripcion...',
        });
      });
      console.log(album.value);
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
    };
  },
};
</script>
<style lang="scss" scoped>
.container {
  margin: 1.5rem;
}

.album-data {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.title {
  margin-bottom: 5px;
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
