<template>
  new album
</template>
<script>
import { onMounted } from 'vue';
import { st } from '../firebase';

export default {
  setup() {
    st.ref().getDownloadURL();

    onMounted(async () => {
      const listRef = st.ref().child('img');
      listRef.listAll().then((res) => {
        console.log(res.items);
        res.items.forEach(async (item) => {
          const url = await item.getDownloadURL();
          console.log(url);
        });
      });
    });
  },
};
</script>
