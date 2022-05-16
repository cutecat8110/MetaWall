<template>
  <div class="posts-wall">
    <Header></Header>
    <main class="container">
      <article>
        <router-view />
      </article>
      <aside>
        <AsideNav></AsideNav>
      </aside>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import AsideNav from '@/components/AsideNav.vue';

export default {
  name: 'HomeView',
  components: {
    Header,
    AsideNav,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-gap: 1.75rem;
  grid-template-columns: 5fr 3fr;
  margin-top: 3rem;
  margin-bottom: 3.875rem;
}

</style>
