<template>
  <div class="border bg-white">
    <router-link to="/post" class="btn post">張貼動態</router-link>
    <ul>
      <li class="btn">
        <img src="../assets/img/user.png" alt="" class="member-photo" />
        <span class="btn-text">邊緣小杰</span>
      </li>
      <li class="btn">
        <div class="btn-icon">
          <span class="material-icons"> notifications_none </span>
        </div>
        <span class="btn-text">追蹤名單</span>
      </li>
      <li class="btn">
        <div class="btn-icon">
          <span class="material-icons"> thumb_up_off_alt </span>
        </div>
        <span class="btn-text">我按讚的文章</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AsideNavCom',
};
</script>

<style lang="scss" scoped>
.border {
  position: sticky;
  top: 108px;
  padding: 2rem 1.5rem;
}

.post {
  padding: 1rem;

  border: 2px solid $black;
  border-radius: 0.5rem;
  background: $blue-dark;
  box-shadow: -2px 2px 0 $black;

  color: $white;
  text-align: center;

  transition: $transition-1;

  &:hover {
    background: $yellow;
  }
}

li {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 3.125rem 1fr;
  align-items: center;
  margin-top: 1rem;

  &:hover {
    > .btn-text {
      color: $blue-dark;
    }
    .btn-icon {
      background: $blue-dark;

      color: $white;
    }
  }
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.125rem;
  height: 3.125rem;

  border: 2px solid $black;
  border-radius: 50%;
  background: $blue-light;

  transition: $transition-1;
}

.btn-text {
  font-weight: bold;

  transition: $transition-1;
}
</style>
