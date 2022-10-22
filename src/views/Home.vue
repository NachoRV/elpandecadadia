<template>
  <TheNav :albums="albums" :selectAlbumTitle="selectAlbumTitle" @selectAlbum="select" />
  <div class="horizontal-snap" v-if="selectAlbum === null" ref="horizontalSnap">
    <button class="left" @click="moveL">
      <img class="img__btn" alt="delete" src="../assets/back.svg" />
    </button>
    <a v-for="p in picture" :key="p" href="#"><img :src="p"></a>
    <button class="right" @click="moveR"> <img class="img__btn" alt="delete" src="../assets/next.svg" /> </button>
  </div>

  <Masonry v-else :album="albums[selectAlbum]" @selectItem="selectItem" />
  <teleport to="body" v-if="showLightbox">
    <lightbox :index="lightboxIndex" :imgs="lightboxImgs" @close="close" />
  </teleport>
</template>
<script setup>
import TheNav from '@/components/TheNav.vue';
import Masonry from '@/components/Masonry.vue';
import Lightbox from '../components/Lightbox.vue';
import { computed, onMounted, ref } from 'vue';
import { db } from '@/firebase';

const albums = ref([]);
const selectAlbum = ref(null);
const selectAlbumTitle = ref(null);
const lightboxImgs = ref([]);
const lightboxIndex = ref(0);
const showLightbox = ref(false);
const picture = ref([])
const horizontalSnap = ref(null);

const layout = () => {
  const numOfImg = albums.value[selectAlbum.value].img.length;
  let numOfLines = numOfImg / 4;
  const resto = parseInt(numOfLines.toString().split('.')[1], 10);
  if (resto) numOfLines = Math.trunc(numOfLines) + 1;
};

const select = (i, title) => {
  console.log(i, title);
  if (i === selectAlbum.value) {
    selectAlbum.value = null;
    selectAlbumTitle.value = null;
    return;
  }
  selectAlbumTitle.value = title;
  selectAlbum.value = i;
  layout();
};
const selectItem = (array, i) => {
  console.log(array, i);
  lightboxImgs.value = array;
  lightboxIndex.value = i;
  showLightbox.value = true;
};

const close = () => {
  console.log('close');
  showLightbox.value = false;
  lightboxImgs.value = [];
  lightboxIndex.value = 0;
};

const getAlbums = () => {
  albums.value = [];
  db.collection('Albums')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        picture.value.push(doc.data().img[0].url)
        albums.value.push(doc.data());
      });
    });
  console.log(picture)
};


function moveR() {
  const position = horizontalSnap.value.scrollLeft + 300;
  horizontalSnap.value.scrollTo(position, 0);
  console.log(horizontalSnap.value.scrollLeft)
};
function moveL() {
  const position = horizontalSnap.value.scrollLeft - 300;
  horizontalSnap.value.scrollTo(position, 0);
  console.log(horizontalSnap.value.scrollLeft)
}
onMounted(async () => {
  await getAlbums();
});

</script>
<style lang="scss" scoped>
.horizontal-snap {
  margin: auto;
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  gap: 1rem;
  padding: 1rem;
  max-width: 90%;
  overflow-y: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
}

.horizontal-snap button {
  position: absolute;
  border-radius: 50px;
  width: 50px !important;
  height: 50px;
  border: none;
  background-color: var(--main-color);
}

.img__btn {
  width: 30px !important;
  height: 30px;
}

button.right {
  right: 10px;
}

button.left {
  left: 10px;
}


.horizontal-snap>a {
  scroll-snap-align: center;
}

.horizontal-snap img {
  width: calc(100vh - 75px);
  max-width: 70vh;
  object-fit: contain;
  border-radius: 1rem;
}
</style>
