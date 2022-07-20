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
  created() {
    this.$store.commit('Load', true);
    const api = `${process.env.VUE_APP_API}/user/profile`;
    const { headers } = this.$store.state;
    this.$http
      .get(api, headers)
      .then((res) => {
        const { user } = res.data;
        delete user.followers;
        delete user.following;
        if (user.photo === '') user.photo = `${process.env.VUE_APP_USER_PHOTO}`;

        this.$store.commit('user', user);
      })
      .catch((err) => {
        console.error(err);
      })
      .then(() => {
        this.$store.commit('Load', false);
      });
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

  @media (max-width: $pad) {
    grid-gap: 0;
    grid-template-columns: 1fr;
  }
}
@media (max-width: $pad) {
  aside {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 0.5rem;
    width: 100%;
  }
}
</style>
