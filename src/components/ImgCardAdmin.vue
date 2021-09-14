<template>
  <div class="img-card" v-for="(img, index) in album.img" :key="img">
    <img :src="img.url" alt="foto" />
    <button @click="deleteImg(img.name, index)"> borrar</button>
    <input type="text" v-model="img.title" placeholder="titulo"/>
    <input type="text" v-model="img.description" placeholder="Descripció" />
    <button @click="saveAlbum"> Crear Album</button>
 </div>
</template>
<script>
export default {
  setup() {
    return {};
  },
};
</script>
<style lang="scss" scoped>

</style>
