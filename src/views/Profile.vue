<template>
  <div class="profile">
    <div class="header-wrapper">
      <div class="header border bg-white radius">
        <div class="user-photo">
          <img @load="successLoadImg" :src="profile.photo" alt="" class="hide" />
        </div>
        <div class="info">
          <div>
            <h1>{{ profile.name }}</h1>
            <span v-if="profile.name"> {{ $filters.currency(followers.length) }} 人追蹤 </span>
          </div>
          <button
            v-if="user._id !== profile._id && profile.name"
            type="button"
            class="btn border radius shadow"
            :class="{ follow: follow }"
            @click="toggle(follow)"
          >
            {{ follow ? '取消追蹤' : '追蹤' }}
          </button>
        </div>
      </div>
      <div class="mat border bg-white radius"></div>
    </div>
    <SubNav />
    <PostsNone v-if="posts.length == 0" />
    <Posts v-for="item in posts" :key="item._id" :tempPost="item" />
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
      profile: {
        _id: '',
        photo: '',
        name: '',
        followers: [],
      },
    };
  },
  mounted() {
    this.getPosts();
    this.getProfile();
  },
  watch: {
    $route() {
      if (this.$route.name === 'profile') {
        this.posts = {};
        this.getPosts();
        this.getProfile();
      }
    },
  },
  computed: {
    followers() {
      const tempList = this.profile.followers;
      const followers = tempList.map((item) => Object.values(item)[0]);
      return followers;
    },
    follow() {
      return this.followers.includes(this.user._id);
    },
    user() {
      const { user } = this.$store.state;
      return user;
    },
  },
  methods: {
    getPosts() {
      this.$store.commit('Load', true);
      const tempQuery = { ...this.$route.query, ...this.$route.params };
      let query = new URLSearchParams(tempQuery).toString();
      if (query) query = `?${query}`;
      const api = `${process.env.VUE_APP_API}/posts${query}`;
      const { headers } = this.$store.state;

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
    getProfile() {
      this.$store.commit('Load', true);

      const { p } = this.$route.params;
      const api = `${process.env.VUE_APP_API}/user/profile?p=${p}`;
      const { headers } = this.$store.state;

      this.$http
        .get(api, headers)
        .then((res) => {
          const { user } = res.data;
          delete user.following;
          delete user.sex;
          if (user.photo === '') user.photo = `${process.env.VUE_APP_USER_PHOTO_2}`;

          this.profile = user;
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          this.$store.commit('Load', false);
        });
    },
    toggle(follow) {
      this.$store.commit('Load', true);

      const { p } = this.$route.params;
      const api = `${process.env.VUE_APP_API}/user/${p}/follow`;
      const { headers } = this.$store.state;
      const method = follow ? this.$http.delete(api, headers) : this.$http.post(api, null, headers);

      method
        .then(() => {
          this.getProfile();
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
}

.header-wrapper {
  position: relative;

  .header {
    position: relative;
    z-index: 1;
    display: flex;
    height: 5rem;

    .user-photo {
      width: 5rem;

      border-right: 2px solid $black;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      width: 100%;
      h1 {
        font-size: 1rem;
      }
      .btn {
        padding: 0.375rem 2rem;

        background: $yellow;

        font-weight: bold;
        &.follow {
          background: $grey-light;
        }
        &:hover {
          background: $blue-dark;

          color: $white;
        }
      }
    }
  }
  .mat {
    position: absolute;
    top: 5px;
    left: -5px;
    width: 100%;
    height: 100%;
  }
}

</style>
