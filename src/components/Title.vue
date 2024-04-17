<template>
  <div class="title">
    <h1 class="border bg-white">{{ title }}</h1>
    <div class="mat border bg-white"></div>
  </div>
</template>

<script>
export default {
  name: 'TitleCMPT',
  props: ['title']
}
</script>

<style lang="scss" scoped>
.title {
  position: relative;
}

h1 {
  position: relative;
  z-index: 1;
  padding: 1rem 0;

  text-align: center;
  font-size: 1.25rem;
}

.mat {
  position: absolute;
  top: 5px;
  left: -5px;
  width: 100%;
  height: 100%;
}
</style>

