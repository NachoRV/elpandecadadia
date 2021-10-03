<template>
  <div class="container">
    <button class="close" @click="close">
      <img
      class="img__btn"
      alt="delete"
      src="../assets/close.svg"
    />
    </button>
    <button class="prev" @click="prev">
    <img
      class="img__btn"
      alt="delete"
      src="../assets/back.svg"
    />
    </button>
    <h3> {{ imgs[i].title }}</h3>
    <img class="picture" :src="imgs[i].url" :alt="imgs[i].url">
    <button class="next" @click="next">
    <img
      class="img__btn"
      alt="delete"
      src="../assets/next.svg"
    />
    </button>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue';

export default {
  name: 'Lightbox',
  props: {
    imgs: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  emit: ['close'],
  setup(props, { emit }) {
    const i = ref(0);
    const next = () => {
      if (i.value === props.imgs.length) return;
      i.value += 1;
    };
    const prev = () => {
      if (i.value === 0) {
        return;
      }
      i.value -= 1;
    };
    const close = () => {
      emit('close');
    };
    onMounted(() => {
      i.value = props.index;
      console.log(props.index);
      console.log(props.imgs);
    });
    return {
      i,
      next,
      prev,
      close,
    };
  },
};
</script>
<style lang="scss" scoped>
.container {
  position: fixed;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.877);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow:hidden;

}
.picture {
  max-width: 90vw;
  max-height: 90vh;
  //max-height: 90vh;
  object-fit: contain;
  box-shadow:  0px 0px 5px 5px white;
}
 button {
    background: transparent;
    border: none;
 }

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.next {
  position: absolute;
  right: 5px;
  cursor: pointer;
}
.prev {
  position: absolute;
  left: 5px;
  cursor: pointer;
}
.img__btn {
  width: 24px;
  height: 24px;
}
h3 {
  color: white;
  margin: 5px;
}
</style>
