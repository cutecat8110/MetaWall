<template>
  <div class="sign-in-view">
    <div class="middle">
      <div class="container border">
        <img @load="successLoadImg" class="cursor-none hide" :src="bg" alt="" />
        <div class="auth-content">
          <h2 class="cursor-none">MetaWall</h2>
          <h3>到元宇宙展開全新社交圈</h3>
          <VForm v-slot="{ errors }" @submit="signIn">
            <div class="input-group">
              <label for="email" class="input-wrapper">
                <VField
                  id="email"
                  name="Email"
                  type="email"
                  v-model="user.email"
                  placeholder="Email"
                  autocomplete="new-password"
                  :rules="{ required: true, email: true }"
                  class="border"
                />
                <div class="tooltip">
                  <div class="title">SAMPLE</div>
                  <div>帳 - test1@example.com</div>
                  <div>密 - Test123456</div>
                </div>
                <error-message name="Email" />
              </label>
              <label for="password" class="input-wrapper">
                <VField
                  id="password"
                  name="Password"
                  type="password"
                  v-model="user.password"
                  placeholder="Password"
                  autocomplete="new-password"
                  rules="required"
                  class="border"
                />
                <div class="tooltip">
                  <div class="title">SAMPLE</div>
                  <div>帳 - test1@example.com</div>
                  <div>密 - Test123456</div>
                </div>
                <error-message name="Password" />
              </label>
            </div>
            <div v-if="err" class="error-message">帳號或密碼錯誤，請重新輸入！</div>
            <button type="submit" class="btn border submit" :disabled="err">登入</button>
          </VForm>
          <router-link :to="{ name: 'sign_up' }" class="btn link">註冊帳號</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignInView',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      err: false,
      bg: process.env.VUE_APP_SIGN_BG,
    };
  },
  watch: {
    user: {
      handler() {
        if (this.err) {
          this.err = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    signIn() {
      this.$store.commit('Load', true);
      const api = `${process.env.VUE_APP_API}/user/sign_in`;
      this.$http
        .post(api, this.user)
        .then((res) => {
          const token = `Bearer ${res.data.user.token}`;
          localStorage.setItem('authorization', token);
          this.$router.push({ name: 'posts_wall' });
        })
        .catch(() => {
          this.err = true;
        })
        .then(() => {
          this.$store.commit('Load', false);
        });
    },
  },
};
</script>

<style lang="scss" src="@/assets/scss/site/_sign.scss" scoped></style>
