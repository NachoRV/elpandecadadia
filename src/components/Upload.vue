<template>
   <UploadImages @changed="handleImages" />
   <button @click="uploadImg">Subir fotos</button>
</template>
<script>
// @ is an alias to /src
import UploadImages from 'vue-upload-drop-images';
import { ref } from 'vue';
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
    const handleImages = (e) => {
      files.value = e;
    };
    const uploadImg = () => {
      files.value.forEach((img, index) => {
        const storageRef = st.ref(props.album).child(`${img.name}`).put(img);
        storageRef.on('state_changed', (/* snapshot */) => {
          // const uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, (error) => { console.log(error.message); },
        () => {
          // const uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            if (!filesUrl.includes(url)) filesUrl.push(url);
            if ((index + 1) === files.value.length) {
              emit('save', filesUrl);
            }
          });
        });
      });
    };

    return {
      handleImages,
      files,
      uploadImg,
    };
  },
};
</script>
