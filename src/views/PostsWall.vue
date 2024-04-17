<template>
  <div class="posts-wall">
    <SubNav />
    <PostsNone v-if="posts.length == 0" />
    <Posts v-for="item in posts" :key="item._id" :tempPost="item" />
  </div>
</template>

<script>
import Posts from '@/components/Posts.vue'
import PostsNone from '@/components/PostsNone.vue'
import SubNav from '@/components/SubNav.vue'

export default {
  name: 'PostsWallView',
  components: {
    Posts,
    PostsNone,
    SubNav
  },
  data() {
    return {
      posts: {}
    }
  },
  mounted() {
    this.getPosts()
  },
  watch: {
    $route() {
      if (this.$route.name === 'posts_wall') this.getPosts()
    }
  },
  methods: {
    getPosts() {
      this.$store.commit('Load', true)
      let query = new URLSearchParams(this.$route.query).toString()
      if (query) query = `?${query}`
      const api = `${process.env.VUE_APP_API}/posts${query}`
      const { headers } = this.$store.state

      this.$http
        .get(api, headers)
        .then((res) => {
          this.posts = res.data.posts
        })
        .catch((err) => {
          console.error(err)
        })
        .then(() => {
          this.$store.commit('Load', false)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.posts-wall {
  display: grid;
  grid-gap: 1rem;
  width: 100%;
}
</style>

