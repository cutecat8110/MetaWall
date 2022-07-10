<template>
  <div v-for="(item, index) in posts" :key="index" class="border bg-white posts">
    <div class="header">
      <img src="../assets/img/user.png" alt="" class="photo" />
      <div class="header-details">
        <div class="author">{{ item.user.name }}</div>
        <div class="create-time">{{ $filters.date(item.createdAt) }}</div>
      </div>
    </div>
    <p>
      {{ item.content }}
    </p>
    <img :src="item.image" alt="" class="posts-photo" />
    <button type="button" class="btn like">
      <span class="material-icons"> thumb_up_off_alt </span>
      <div class="qty">{{ item.likes }}</div>
    </button>
    <div class="user">
      <img src="../assets/img/user.png" alt="" class="photo" />
      <div class="border message-add">
        <label for="message">
          <input id="message" type="text" placeholder="留言..." />
        </label>
        <button type="button" class="btn">留言</button>
      </div>
    </div>
    <div class="message">
      <div class="header">
        <img src="../assets/img/user.png" alt="" class="photo" />
        <div class="header-details">
          <div class="author">邊緣小杰</div>
          <div class="create-time">2022/1/10 12:00</div>
        </div>
      </div>
      <p>
        {{ `真的～我已經準備冬眠了` }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostsCom',
  props: ['posts'],
  data() {
    return {};
  },
  methods: {
    isToday(date) {
      return this.moment(date).format('YYYY/MM/DD hh:mm');
    },
  },
};
</script>

<style lang="scss" scoped>
.posts {
  display: grid;
  grid-gap: 1rem;
  padding: 1.5rem;

  border-radius: 0.5rem;
}

.header {
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: 45px 1fr;
  .photo {
    margin-right: 1rem;
    width: 45px;
    height: 45px;
  }
  .author {
    font-weight: bold;
  }
  .create-time {
    color: $grey-dark;
    font-size: 0.75rem;
  }
}

.header-details {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.posts-photo {
  width: 100%;
}

.like {
  display: flex;
  align-items: center;

  color: $blue-dark;
}

.qty {
  margin-left: 0.5rem;
}

.user {
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 2.5rem 1fr;
  .photo {
    width: 2.5rem;
    height: 2.5rem;
  }
}

.message-add {
  display: grid;
  grid-template-columns: 1fr auto;

  label {
    padding: 0.5rem 1rem;

    border-right: 2px solid $black;
  }

  input {
    width: 100%;

    outline: none;
    border: 0;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 3rem;

    background: $blue-dark;

    color: $white;

    transition: $transition-1;

    &:hover {
      background: $yellow;
    }
  }
}

.message {
  padding: 1rem;

  border-radius: 0.75rem;
  background: $grey-light;
  p {
    margin-left: 3.8125rem;
  }
}
</style>
