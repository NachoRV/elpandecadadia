<template>
  <TheNav :albums="albums" :selectAlbumTitle="selectAlbumTitle" @selectAlbum="select" />
</template>
<script setup>
import TheNav from '@/components/TheNav.vue';
import { onMounted, ref } from 'vue';
import { db } from '@/firebase';

const albums = ref([]);
const selectAlbum = ref(null);
const selectAlbumTitle = ref(null);

// const layout = () => {
//   const numOfImg = albums.value[selectAlbum.value].img.length;
//   let numOfLines = numOfImg / 4;
//   const resto = parseInt(numOfLines.toString().split('.')[1], 10);
//   if (resto) numOfLines = Math.trunc(numOfLines) + 1;
//   // switch(restt) {
//   //  case 25:
//   // }
// };

const select = (i, title) => {
  console.log(i, title);
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
  console.log('Data', albums.value);
};

onMounted(async () => {
  await getAlbums();
});

</script>
<style lang="scss" scoped>
</style>
