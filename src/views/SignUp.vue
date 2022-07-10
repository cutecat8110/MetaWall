<template>
  <div class="sign-up-view">
    <div class="middle">
      <div class="container border">
        <img src="@/assets/img/login.svg" alt="" />
        <div class="auth-content">
          <h2>MetaWall</h2>
          <h3>到元宇宙展開全新社交圈</h3>
          <div class="input-group">
            <div class="border bg-white input">
              <label for="name">
                <input id="name" v-model="name" type="text" placeholder="暱稱" />
              </label>
            </div>
            <div class="border bg-white input">
              <label for="email">
                <input id="email" v-model="email" type="text" placeholder="Email" />
              </label>
            </div>
            <div class="border bg-white input">
              <label for="password">
                <input id="password" v-model="password" type="text" placeholder="Password" />
              </label>
            </div>
          </div>
          <button type="button" class="btn border submit" @click="submit()">註冊</button>
          <router-link :to="{ name: 'sign_in' }" class="btn">登入</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {},
};
</script>

<style lang="scss" src="@/assets/scss/site/_sign.scss" scoped></style>
