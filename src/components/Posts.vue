<template>
  <div v-for="(item, index) in list" :key="index" class="border bg-white posts">
    <div class="header">
      <img src="../assets/img/user.png" alt="" class="photo" />
      <div class="header-details">
        <div class="author">邊緣小杰</div>
        <div class="create-time">2022/1/10 12:00</div>
      </div>
    </div>
    <p>
      {{ `外面看起來就超冷....我決定回被窩繼續睡....>.<` }}
    </p>
    <img src="../assets/img/image.png" alt="" class="posts-photo" />
    <div class="btn like">
      <span class="material-icons"> thumb_up_off_alt </span>
      <div class="qty">12</div>
    </div>
    <div class="user">
      <img src="../assets/img/user.png" alt="" class="photo" />
      <div class="border message-add">
        <label for="message">
          <input id="message" type="text" placeholder="留言..." />
        </label>
        <div class="btn">留言</div>
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
  data() {
    return {
      list: [
        { id: '123456789', name: '選項 1' },
        { id: '234567890', name: '選項 2' },
        { id: '345678901', name: '選項 3' },
      ],
    };
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
    color: $dark-grey;
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

  color: $dark-blue;
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

    background: $dark-blue;

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
  background: $light-grey;
  p {
    margin-left: 3.8125rem;
  }
}
</style>
