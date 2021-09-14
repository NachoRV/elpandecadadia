<template>
<div v-for="img in imgs.img" :key="img.title" >
  <img :src="img.url" />
</div>
</template>
<script>
import { onMounted, ref } from 'vue';
import { db } from '../firebase';

export default {
  setup() {
    // st.ref().getDownloadURL();
    const imgs = ref([]);

    onMounted(async () => {
      db.collection('Albums').get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            imgs.value = doc.data();
            console.log(doc.id, ' => ', doc.data());
            console.log(imgs.value);
          });
        });

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
      imgs,
    };
  },
};
</script>
