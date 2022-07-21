<template>
  <div class="follow-list">
    <Title :title="'追蹤名單'" />
    <div v-for="follow in list" :key="follow.user._id" class="card border bg-white shadow radius">
      <router-link
        :to="{ path: `/profile/${follow.user._id}` }"
        class="user-photo border circle btn"
      >
        <img @load="successLoadImg" :src="follow.user.photo || photo" alt="" class="hide" />
      </router-link>
      <router-link :to="{ path: `/profile/${follow.user._id}` }" class="fw-bold btn">
        {{ follow.user.name }}
      </router-link>
      <span class="created"> 追蹤時間：{{ $filters.date(follow.createdAt) }} </span>
      <span class="day">您已追蹤 {{ $filters.now(follow.createdAt) }}! </span>
    </div>
    <PostsNone v-if="list.length == 0" />
  </div>
</template>

<script>
import Title from '@/components/Title.vue';
import PostsNone from '@/components/PostsNone.vue';

export default {
  name: 'FollowListView',
  components: {
    Title,
    PostsNone,
  },
  data() {
    return {
      list: [],
      photo: process.env.VUE_APP_USER_PHOTO,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$store.commit('Load', true);
      const api = `${process.env.VUE_APP_API}/user/profile`;
      const { headers } = this.$store.state;
      this.$http
        .get(api, headers)
        .then((res) => {
          const { user } = res.data;
          this.list = user.following;
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
.follow-list {
  display: grid;
  grid-gap: 1rem;
}

.card {
  display: grid;
  grid-template-columns: 2.5rem 1fr auto;
  padding: 1rem;

  column-gap: 1rem;
}

.user-photo {
  grid-row-end: 3;
  grid-row-start: 1;
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

.created {
  grid-column-end: 3;
  grid-column-start: 2;

  color: $grey-dark;
  font-size: 0.875rem;
}

.fw-bold {
  &:hover {
    color: $blue-dark;
    text-decoration: underline;
  }
}

.day {
  font-size: 0.875rem;
}
</style>
