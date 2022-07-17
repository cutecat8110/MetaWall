<template>
  <div class="profile">
    <SubNav></SubNav>
    <PostsNone v-if="posts.length == 0"></PostsNone>
    <Posts v-for="item in posts" :key="item._id" :tempPost="item"></Posts>
  </div>
</template>

<script>
import Posts from '@/components/Posts.vue';
import PostsNone from '@/components/PostsNone.vue';
import SubNav from '@/components/SubNav.vue';

export default {
  name: 'ProfileView',
  components: {
    Posts,
    PostsNone,
    SubNav,
  },
  data() {
    return {
      posts: {},
    };
  },
  mounted() {
    this.getPosts();
  },
  watch: {
    $route() {
      if (this.$route.name === 'profile') this.getPosts();
    },
  },
  methods: {
    getPosts() {
      this.$store.commit('Load', true);
      const tempQuery = { ...this.$route.query, ...this.$route.params };
      let query = new URLSearchParams(tempQuery).toString();
      if (query) query = `?${query}`;
      const api = `${process.env.VUE_APP_API}/posts${query}`;
      const headers = {
        headers: {
          authorization: localStorage.getItem('authorization'),
        },
      };
      this.$http
        .get(api, headers)
        .then((res) => {
          this.posts = res.data.posts;
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          this.$store.commit('Load', false);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  display: grid;
  grid-gap: 1rem;
  width: 100%;
}
</style>
