<template>
   <UploadImages @changed="handleImages" />
</template>
<script>
// @ is an alias to /src
import { ref } from 'vue';
import UploadImages from './vue-upload-drop-images.vue';
import { st } from '../firebase';

export default {
  name: 'Home',
  components: {
    UploadImages,
  },
  props: {
    album: {
      type: String,
      default: 'permanente',
    },
  },
  emits: ['save'],
  setup(props, { emit }) {
    const files = ref([]);
    const filesUrl = [];
    const uploadImg = () => {
      files.value.forEach((img) => {
        console.log(img);
        const storageRef = st.ref(props.album).child(`${img.name}`).put(img);
        storageRef.on('state_changed', (snapshot) => {
          const uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(uploadValue);
          document.getElementById('reset').dispatchEvent(new MouseEvent('click', { bubbles: true, cancellable: true }));
        },
        (error) => { console.log(error.message); },
        () => {
          console.log(props.album, img.name);
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            if (!filesUrl.includes(url)) {
              filesUrl.push(url);
              emit('save', { url, name: `${props.album}/${img.name}` });
              console.log(filesUrl);
            }
          });
        });
      });
    };
    const handleImages = (e) => {
      files.value = e;
      uploadImg();
    };
    return {
      handleImages,
      files,
      uploadImg,
    };
  },
};
</script>
