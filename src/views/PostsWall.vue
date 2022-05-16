<template>
  <div class="posts-wall">
    <div class="subnav">
      <div class="btn border bg-white filter">
        最新貼文
        <span class="material-icons">expand_more</span>
      </div>
      <div class="border bg-white search">
        <label for="search">
          <input id="search" type="text" placeholder="搜尋貼文" />
        </label>
        <div class="btn">
          <span class="material-icons"> search </span>
        </div>
      </div>
    </div>
    <Posts></Posts>
  </div>
</template>

<script>
import Posts from '@/components/Posts.vue';

export default {
  name: 'PostsWallView',
  components: {
    Posts,
  },
};
</script>

<style lang="scss" scoped>
.posts-wall {
  width: 100%;
  display: grid;
  grid-gap: 1rem;
}

.subnav {
  display: grid;
  grid-gap: 0.75rem;
  grid-template-columns: 9.75rem 1fr;
}

.filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .material-icons {
    font-size: 1.25rem;
  }
}

.filter,
.search label {
  padding: 0.75rem 1rem;
}

.search {
  display: grid;
  grid-template-columns: 1fr 2.875rem;

  label {
    border-right: 2px solid $black;
  }

  input {
    width: 100%;

    outline: none;
    border: 0;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;

    background: $dark-blue;

    color: $white;

    transition: $transition-1;
    &:hover {
      background: $yellow;
    }
  }
}
</style>
