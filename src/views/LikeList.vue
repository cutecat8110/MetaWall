<template>
  <div class="like-list">
    <Title :title="'我按讚的貼文'" />
    <div v-for="post in posts" :key="post._id" class="card border bg-white shadow radius">
      <router-link :to="{ path: `/profile/${post.user._id}` }" class="user-photo border circle btn">
        <img @load="successLoadImg" :src="post.user.photo || photo" alt="" class="hide" />
      </router-link>
      <div class="info">
        <router-link :to="{ path: `/profile/${post.user._id}` }" class="fw-bold btn">
          {{ post.user.name }}
        </router-link>
        <span class="created">發文時間：{{ $filters.date(post.createdAt) }} </span>
      </div>
      <button type="button" class="cancel btn fw-bold" @click="unlike(post._id)">
        <span class="material-icons"> thumb_up_off_alt </span>
        取消
      </button>
      <router-link
        :to="{ path: `/like_list`, query: { id: `${post._id}` } }"
        class="check btn fw-bold"
      >
        <span class="material-icons"> arrow_circle_up </span>
        查看
      </router-link>
    </div>
    <Posts v-if="Object.keys(post).length > 0" :tempPost="post" />
    <PostsNone v-if="posts.length == 0 && Object.keys(post).length == 0 && load" />
  </div>
</template>

<script>
import Title from '@/components/Title.vue';
import Posts from '@/components/Posts.vue';
import PostsNone from '@/components/PostsNone.vue';

export default {
  name: 'LikeListView',
  components: {
    Title,
    Posts,
    PostsNone,
  },
  data() {
    return {
      posts: [],
      post: {},
      photo: process.env.VUE_APP_USER_PHOTO,
      load: false,
    };
  },
  watch: {
    $route: {
      handler() {
        this.load = false;
        this.posts = [];
        this.post = {};
        if (this.$route.query.id) {
          return this.getPost();
        }
        return this.getList();
      },
      immediate: true,
    },
  },
  methods: {
    getList() {
      this.$store.commit('Load', true);
      const api = `${process.env.VUE_APP_API}/user/likeList`;
      const { headers } = this.$store.state;
      this.$http
        .get(api, headers)
        .then((res) => {
          const { posts } = res.data;
          this.posts = posts;
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          this.$store.commit('Load', false);
          this.load = true;
        });
    },
    getPost() {
      this.$store.commit('Load', true);
      const { id } = this.$route.query;
      const api = `${process.env.VUE_APP_API}/post/${id}`;
      const { headers } = this.$store.state;
      this.$http
        .get(api, headers)
        .then((res) => {
          const { post } = res.data;
          this.post = post;
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          this.$store.commit('Load', false);
          this.load = true;
        });
    },
    unlike(id) {
      this.$store.commit('Load', true);
      const api = `${process.env.VUE_APP_API}/post/${id}/likes`;
      const { headers } = this.$store.state;

      this.$http
        .delete(api, headers)
        .then(() => {
          this.getList();
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
.like-list {
  display: grid;
  grid-gap: 1rem;
}

.card {
  display: grid;
  grid-template-columns: 2.5rem 1fr auto auto;
  align-items: center;
  padding: 1rem 2rem 1rem 1rem;

  column-gap: 1rem;
}

.user-photo {
  align-items: center;
  height: 2.5rem;
  &:hover {
    img {
      filter: brightness(0.9);
    }
  }
  img {
    transition: $transition-1;
  }
}

.info .fw-bold {
  &:hover {
    color: $blue-dark;
    text-decoration: underline;
  }
}

.created {
  color: $grey-dark;
  font-size: 0.875rem;
}

.cancel,
.check {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 0.5rem;
}

.cancel .material-icons {
  color: $blue-dark;
}

.check .material-icons {
  transition: $transition-1;
  transform: rotate(90deg);
}

.day {
  font-size: 0.875rem;
}
</style>
