<template>
  <ul class="aside-nav border bg-white">
    <li>
      <router-link to="/post" class="btn post radius">張貼動態</router-link>
    </li>
    <li>
      <router-link :to="{ path: `/profile/${user._id}` }" class="btn link">
        <div class="user-photo border circle">
          <img @load="successLoadImg" :src="user.photo" alt="" class="hide" />
        </div>
        <span class="text">{{ user.name }}</span>
      </router-link>
    </li>
    <li>
      <router-link :to="{ path: `/` }" class="btn link">
        <div class="btn-icon border circle">
          <span class="material-icons"> notifications_none </span>
        </div>
        <span class="text">追蹤名單</span>
      </router-link>
    </li>
    <li>
      <router-link :to="{ path: `/` }" class="btn link">
        <div class="btn-icon border circle">
          <span class="material-icons"> thumb_up_off_alt </span>
        </div>
        <span class="text">我按讚的文章</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AsideNavCom',
  computed: {
    user() {
      const { user } = this.$store.state;
      return user;
    },
  },
};
</script>

<style lang="scss" scoped>
.aside-nav {
  position: sticky;
  top: 6.75rem;
  padding: 2rem 1.5rem;
}

ul {
  display: grid;

  gap: 1rem;
}

.post {
  padding: 1rem;

  border: 2px solid $black;
  background: $blue-dark;
  box-shadow: -2px 2px 0 $black;

  color: $white;
  text-align: center;

  &:hover {
    background: $yellow;
  }
}

.link {
  display: flex;
  align-items: center;

  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    width: 3.125rem;
    height: 3.125rem;

    background: $blue-light;

    transition: $transition-1;
  }

  img {
    transition: $transition-1;
  }

  .text {
    font-weight: bold;

    transition: $transition-1;
  }

  &:hover {
    > .text {
      color: $blue-dark;
    }

    .btn-icon {
      background: $blue-dark;

      color: $white;
    }

    img {
      filter: brightness(0.9);
    }
  }
}
</style>
