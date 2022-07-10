<template>
  <div class="app">
    <loading :active="isLoading" :opacity="opacity" :backgroundColor="backgroundColor" />
    <router-view />
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: {
    Loading,
  },
  data() {
    return {
      opacity: 0.5,
      backgroundColor: '#EFECE7',
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>

<style lang="scss">
@import 'assets/scss/app';
body {
  background: #efece7;
  background-image: linear-gradient(rgba(112, 112, 112, 0.3) 1px, transparent 0),
    linear-gradient(90deg, rgba(112, 112, 112, 0.3) 1px, transparent 0);
  background-size: 60px 60px, 60px 60px;
  height: 100%;
}
</style>
