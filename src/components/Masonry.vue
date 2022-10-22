<template>
  <section class="section__masonry">
    <div class="section__masonry-wrapper">
      <div class="section__masonry-wrapper__item" v-for="(img, index) in getImg" :key="img.url"
        @click="selectItem(album.img, index)">
        <img :src="img.url" alt="" class="section__masonry-wrapper__item-img" />
      </div>
    </div>
  </section>
</template>
<script>
import { computed } from 'vue';

export default {
  name: 'Masonry',
  props: {
    album: {
      type: [Object, Array],
      default: () => ({}),
    },
  },
  emits: ['selectItem'],
  setup(props, { emit }) {
    console.log(props.album);

    const getImg = computed(() => {
      const al = props.album.img;
      console.log(props.album.length > 0);
      return props.album?.img?.length > 0 ? al.sort((a, b) => a.position - b.position) : [];
    });
    const selectItem = (img, index) => {
      emit('selectItem', img, index);
    };
    return {
      selectItem,
      getImg,
    };
  },
};
</script>
<style lang="scss" scoped>
.section__masonry {
  display: flex;
  max-height: calc(100% - 65px);
  justify-content: center;
  overflow: auto;
  padding-top: 3em;
}

.section__masonry-wrapper {
  width: 95vw;
  columns: 1;
  padding-right: var(--gap-img);
  padding-left: var(--gap-img);
}

.section__masonry-wrapper__item {
  width: 100%;
  cursor: pointer;
}

.section__masonry-wrapper__item :hover {
  opacity: 0.6;
  transition: 0.5s;
}

.section__masonry-wrapper__item-img {
  width: 100%;
  height: auto;
  margin-bottom: var(--gap-img);
}

@media screen and (min-width: 568px) {
  .section__masonry-wrapper {
    columns: 2;
  }
}


@media screen and (min-width: 768px) {
  .section__masonry-wrapper {
    columns: 3;
  }
}

@media screen and (min-width: 992px) {
  .section__masonry-wrapper {
    columns: 3;
  }
}

@media screen and (min-width: 1092px) {
  .section__masonry-wrapper {
    columns: 4;
  }
}

@media screen and (min-width: 4092px) {
  .section__masonry-wrapper {
    columns: 5;
  }
}
</style>
