<template>
  <section class="section__masonry">
    <div class="section__masonry-wrapper">
      <div
        class="section__masonry-wrapper__item"
        v-for="(img, index) in album.img"
        :key="img.url"
        @click="selectItem(album.img, index)"
      >
        <img
          :src="img.url"
          alt=""
          class="section__masonry-wrapper__item-img
        "
        />
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Masonry',
  props: {
    album: {
      type: Array,
      default: () => ([]),
    },
  },
  emits: ['selectItem'],
  setup(props, { emit }) {
    const selectItem = (img, index) => {
      emit('selectItem', img, index);
    };
    return {
      selectItem,
    };
  },
};
</script>
<style lang="scss" scoped>
.section__masonry {
  display: flex;
  justify-content: center;
  margin-top: 5em;
}

.section__masonry-wrapper {
  width: 576px;
  columns: 2;
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

@media (min-width: 768px) {
  .section__masonry-wrapper {
    columns: 3;
    width: 970px;
  }
}

@media (min-width: 992px) {
  .section__masonry-wrapper {
    columns: 3;
  }
}

</style>
