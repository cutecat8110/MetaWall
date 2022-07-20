<template>
  <div class="post border bg-white radius shadow">
    <!-- 貼文資訊 -->
    <div class="header">
      <router-link :to="{ path: `/profile/${post.user._id}` }" class="user-photo border circle btn">
        <img @load="successLoadImg" :src="photo" alt="" class="hide" />
      </router-link>
      <div class="info">
        <router-link :to="{ path: `/profile/${post.user._id}` }" class="btn fw-bold">
          {{ post.user.name }}
        </router-link>
        <span>{{ $filters.date(post.createdAt) }}</span>
      </div>
    </div>

    <!-- 貼文內容 -->
    <p>
      {{ post.content }}
    </p>

    <!-- 貼文圖片 -->
    <div v-if="post.image" class="image-wrapper border radius">
      <div class="clamp" :style="paddingBottom">
        <img
          ref="postsPhoto"
          @load="successLoadImg, size()"
          :src="post.image"
          alt=""
          class="hide"
        />
      </div>
    </div>

    <!-- 按讚 -->
    <button
      type="button"
      class="likes btn"
      :class="{ selected: isSelected }"
      @click="toggle(isSelected)"
    >
      <span class="material-icons"> thumb_up_off_alt </span>
      {{ post.likes.length == 0 ? '成為第一個按讚的朋友' : post.likes.length }}
    </button>

    <!-- 留言 -->
    <div class="comment-wrapper">
      <router-link :to="{ path: `/profile/${user._id}` }" class="user-photo border circle btn">
        <img @load="successLoadImg" :src="user.photo" alt="" class="hide" />
      </router-link>
      <div class="comment border">
        <label for="comment">
          <input
            id="comment"
            type="text"
            placeholder="留言..."
            v-model="comment"
            @keyup.enter="comment"
          />
        </label>
        <button type="button" class="btn" @click="send">留言</button>
      </div>
    </div>

    <div v-for="(comment, key) in post.comments" :key="key" class="comments">
      <div class="header">
        <router-link
          :to="{ path: `/profile/${comment.user._id}` }"
          class="user-photo border circle btn"
        >
          <img
            @load="successLoadImg"
            :src="comment.user.photo !== '' ? comment.user.photo : commentPhoto"
            alt=""
            class="hide"
          />
        </router-link>

        <div class="info">
          <router-link :to="{ path: `/profile/${comment.user._id}` }" class="btn fw-bold">
            {{ comment.user.name }}
          </router-link>
          <span>{{ $filters.date(comment.createdAt) }}</span>
        </div>
      </div>
      <p>
        {{ comment.comment }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostsCMPT',
  props: ['tempPost'],
  data() {
    return {
      post: {},
      comment: '',
      paddingBottom: {},
      commentPhoto: process.env.VUE_APP_USER_PHOTO,
    };
  },
  watch: {
    tempPost: {
      handler() {
        this.post = this.tempPost;
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    photo() {
      const { photo } = this.post.user;
      if (photo === '') return `${process.env.VUE_APP_USER_PHOTO}`;
      return photo;
    },
    isSelected() {
      const { likes } = this.post;
      return likes.includes(this.user._id);
    },
  },
  methods: {
    isToday(date) {
      return this.moment(date).format('YYYY/MM/DD hh:mm');
    },
    toggle(isSelected) {
      this.$store.commit('Load', true);
      const api = `${process.env.VUE_APP_API}/post/${this.post._id}/likes`;
      const { headers } = this.$store.state;
      const method = isSelected
        ? this.$http.delete(api, headers)
        : this.$http.post(api, null, headers);

      method
        .then(() => {
          this.upload();
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          this.$store.commit('Load', false);
        });
    },
    send() {
      if (this.comment !== '') {
        this.$store.commit('Load', true);
        const api = `${process.env.VUE_APP_API}/post/${this.post._id}/comment`;
        const { headers } = this.$store.state;
        const comment = {
          comment: this.comment,
        };

        this.$http
          .post(api, comment, headers)
          .then(() => {
            this.comment = '';
            this.upload();
          })
          .catch((err) => {
            console.error(err);
          })
          .then(() => {
            this.$store.commit('Load', false);
          });
      }
    },
    upload() {
      this.$store.commit('Load', true);
      const api = `${process.env.VUE_APP_API}/post/${this.post._id}`;
      const { headers } = this.$store.state;
      this.$http
        .get(api, headers)
        .then((res) => {
          this.post = res.data.post;
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          this.$store.commit('Load', false);
        });
    },
    size() {
      if (this.$refs.postsPhoto) {
        const { height } = this.$refs.postsPhoto;
        const { width } = this.$refs.postsPhoto;
        const ratio = (height / width) * 100;
        this.paddingBottom = {
          paddingBottom: ratio > 150 ? '150%' : `${ratio}%`,
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  display: grid;
  grid-gap: 1rem;
  padding: 1.5rem;
}

.user-photo {
  &:hover {
    img {
      filter: brightness(0.9);
    }
  }
  img {
    transition: $transition-1;
  }
}

.header {
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: 45px 1fr;
  .user-photo {
    width: 45px;
    height: 45px;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  a {
    width: fit-content;
    &:hover {
      color: $blue-dark;
      text-decoration: underline;
    }
  }
  span {
    color: $grey-dark;
    font-size: 0.75rem;
  }
}

.image-wrapper {
  background: $blue-light;

  .clamp {
    position: relative;
    overflow: hidden;
    padding-bottom: 52.35%;
  }
  img {
    position: absolute;
    display: block;
    width: 100%;
  }
}

.likes {
  display: flex;
  align-items: center;
  width: fit-content;

  color: $grey-dark;
  &:hover {
    color: $blue-dark;
  }
  span {
    margin-right: 0.5rem;
  }
  &.selected {
    color: $blue-dark;
  }
}

.comment-wrapper {
  display: grid;
  grid-gap: 0.5rem;
  width: 100%;
  grid-template-columns: 2.5rem 1fr;
  .user-photo {
    width: 2.5rem;
    height: 2.5rem;
  }
  .comment {
    display: flex;

    label {
      padding: 0.5rem 1rem;
      width: 100%;

      border-right: 2px solid $black;
    }

    input {
      width: 100%;

      outline: none;
      border: 0;
    }

    .btn {
      padding: 0.5rem 3rem;

      background: $blue-dark;

      color: $white;

      &:hover {
        background: $yellow;

        color: $black;
      }
      @media (max-width: $pad) {
        padding: 0.5rem 2.25rem;
      }
      @media (max-width: $mobile) {
        padding: 0.5rem 1.5rem;
      }
    }
  }
}

.comments {
  padding: 1rem;

  border-radius: 0.75rem;
  background: $grey-light;
  p {
    margin-left: calc(45px + 1rem);
  }
}
</style>
