<template>
  <div class="setting">
    <Title :title="'修改個人資料'" />
    <div>
      <div class="tab">
        <router-link :to="{ name: 'account' }" class="btn border bg-white"> 暱稱修改 </router-link>
        <router-link :to="{ name: 'security' }" class="btn border bg-white"> 重設密碼 </router-link>
      </div>
      <div class="form-wrapper radius shadow border bg-white">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title.vue';

export default {
  name: 'SettingView',
  components: {
    Title,
  },
};
</script>

<style lang="scss" scoped>
.setting {
  display: grid;
  grid-gap: 2rem;
}

.tab {
  display: flex;
  margin-left: 1rem;
  .btn {
    padding: 0.5rem 1.5rem;

    border-bottom: 0;
    border-radius: 0.5rem 0.5rem 0 0;
    &.router-link-exact-active {
      background: $black;

      color: $white;
    }
  }
}

.form-wrapper {
  padding: 2rem 6.5rem;
}

form {
  background: green;
}

</style>
