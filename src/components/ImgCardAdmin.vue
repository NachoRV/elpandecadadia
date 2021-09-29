<template>
  <div class="img-card">
    <img :src="img.url" alt="foto" />
    <img
      alt="delete"
      src="../assets/delete.svg"
      class="delete"
      @click="deleteImg(img.name, index)"
    />
    <input
      type="text"
      v-model="title"
      placeholder="Título"
      @change="setTitle"
    />
    <textarea
      maxlength="200"
      v-model="description"
      placeholder="Descripción..."
      @change="setDescription"
    />
  </div>
</template>
<script>
import { onMounted, ref } from 'vue';

export default {
  name: 'ImgCardAdmin',
  props: {
    img: {
      type: Object,
      required: false,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  events: ['setTitle', 'setDescription', 'deleteImg'],
  setup(props, { emit }) {
    const title = ref('');
    const description = ref('');

    const setTitle = () => {
      emit('setTitle', title.value);
    };
    const setDescription = () => {
      emit('setDescription', description.value);
    };

    const deleteImg = () => {
      emit('deleteImg', props.img.name, props.index);
    };

    onMounted(() => {
      if (props.img.title) {
        title.value = props.img.title;
      }
      if (props.img.description) {
        description.value = props.img.description;
      }
    });

    return {
      title,
      description,
      setTitle,
      setDescription,
      deleteImg,
    };
  },
};
</script>
<style lang="scss" scoped>

.img-card {
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%),
  0 2px 2px 0 rgb(0 0 0 / 14%),
  0 1px 5px 0 rgb(0 0 0 / 12%);
  border-radius: .5rem;

  img {
    width: 260px;
    height: 260px;
    margin-bottom: .5rem;
    border-radius: 5px 5px 0 0;
  }

  textarea {
    border: none;
    outline: none;
    width: 90%;
    margin: 0.5rem auto;
    resize: none;
    height: 12.5rem;
  }

    textarea:focus {
    border-bottom: 2px solid black;
    outline: none;
  }

  input {
    border: none;
    background-color: transparent;
    margin-bottom: .5rem;
    width: 90%;
    margin: 0.5rem auto;
    font-size: 1.5rem;
    font-weight: bold;
  }

  input:focus {
    border-bottom: 2px solid black;
    outline: none;
  }

  .delete {
    position: absolute;
    top: 0;
    right: 5px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

}
</style>
