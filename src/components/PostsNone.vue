<template>
  <div class="border bg-white posts-none radius">
    <ul class="ball-group">
      <li class="ball circle" />
      <li class="ball circle" />
      <li class="ball circle" />
    </ul>
    <div class="content">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'PostsNoneCom',
  computed: {
    message() {
      if (this.$route.query.q) return `找不到符合「${this.$route.query.q}」的貼文`;
      return '目前尚無動態，新增一則貼文吧！';
    },
  },
};
</script>

<style lang="scss" scoped>
.posts-none {
  box-shadow: 0 3px 0 $black;
}
.ball-group {
  display: flex;
  padding: 1rem;

  border-bottom: 1px solid $black;
  .ball {
    width: 0.5rem;
    height: 0.5rem;

    border: 1px $grey-darker solid;
    background: $yellow-dark;
    &:not(:last-child) {
      margin-right: 6px;
    }
    &:first-child {
      background: $pink-dark;
    }
    &:last-child {
      background: $green;
    }
  }
}
.content {
  padding: 2rem 1rem;

  color: $grey-dark;
  text-align: center;
}

</style>
