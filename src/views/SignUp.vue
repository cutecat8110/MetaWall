<template>
  <div class="sign-up-view">
    <div class="middle">
      <div class="container border">
        <img class="cursor-none" src="@/assets/img/sign.svg" alt="" />
        <div class="auth-content">
          <h2 class="cursor-none">MetaWall</h2>
          <h3>到元宇宙展開全新社交圈</h3>
          <VForm v-slot="{ errors }" @submit="signUp">
            <div class="input-group">
              <label for="name" class="input-wrapper">
                <VField
                  id="name"
                  name="暱稱"
                  type="name"
                  v-model="user.name"
                  placeholder="暱稱"
                  autocomplete="new-password"
                  :rules="{ required: true, min: 2, max: 13 }"
                  class="border"
                />
                <error-message name="暱稱" />
              </label>
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
                  :rules="{ regex: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/ }"
                  class="border"
                />
                <error-message name="Password">
                  <span> Password 不能小於 8 個字元，需包含大小寫和數字 </span>
                </error-message>
              </label>
            </div>
            <div v-if="message" class="error-message">{{ message }}</div>
            <button type="submit" class="btn border submit" :disabled="disabled(errors)">
              註冊
            </button>
          </VForm>
          <router-link :to="{ name: 'sign_in' }" class="btn link">登入</router-link>
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
      user: {
        name: '',
        email: '',
        password: '',
      },
      message: '',
    };
  },
  watch: {
    user: {
      handler() {
        if (this.message) {
          this.message = '';
        }
      },
      deep: true,
    },
  },
  methods: {
    signUp() {
      this.$store.commit('Load', true);
      const api = `${process.env.VUE_APP_API}/user/sign_up`;
      this.$http
        .post(api, this.user)
        .then((res) => {
          const token = `Bearer ${res.data.user.token}`;
          localStorage.setItem('authorization', token);
          this.$router.push({ name: 'posts_wall' });
        })
        .catch((err) => {
          const { message } = err.response.data;
          this.message = message;
        })
        .then(() => {
          this.$store.commit('Load', false);
        });
    },
    disabled(errors) {
      const { name, email, password } = this.user;
      const err = Object.keys(errors).length;
      if (name && email && password && err === 0) return false;
      return true;
    },
  },
};
</script>

<style lang="scss" src="@/assets/scss/site/_sign.scss" scoped></style>
