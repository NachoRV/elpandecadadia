<template>
  <div class="container">
    <button class="close" @click="close">
      <img class="img__btn" alt="delete" src="../assets/close.svg" />
    </button>
    <button class="prev" @click="prev">
      <img class="img__btn" alt="delete" src="../assets/back.svg" />
    </button>
    <div class="img__wrapper">
      <div class="card"  >
        <span>
          <h3>{{ imgs[i].title }}</h3>
          <p>{{ imgs[i].description }}</p>
        </span>
      </div>
      <img class="picture" :src="imgs[i].url" :alt="imgs[i].url" />
    </div>

    <button class="next" @click="next">
      <img class="img__btn" alt="delete" src="../assets/next.svg" />
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
      if (i.value === props.imgs.length - 1) return;
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
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.picture {
  max-width: 100vw;
  max-height: 100vh;
  object-fit: contain;

}
button {
  border-radius: 50%;
  border: none;
  background: transparent;
  width: 50px;
  height: 50px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

button:hover {
  background: rgba(53, 52, 52, 0.993);
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
.img__wrapper {
  position: relative;
}
.card {
  z-index: 1;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  opacity: 0;
  width: 100%;
  height: 100%;
  span {
    position: absolute;
    bottom: 0px;
    h3, p {
      margin: 1rem;
    }
  }

}
.card:hover{
  opacity: 1;

}
</style>
