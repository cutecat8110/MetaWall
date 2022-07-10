<template>
  <div class="sign-in-view">
    <div class="middle">
      <div class="container border">
        <img src="@/assets/img/login.svg" alt="" />
        <div class="auth-content">
          <h2>MetaWall</h2>
          <h3>到元宇宙展開全新社交圈</h3>
          <div class="input-group">
            <div class="border bg-white input">
              <label for="email">
                <input
                  id="email"
                  v-model="user.email"
                  type="text"
                  placeholder="Email"
                  autocomplete="new-password"
                />
              </label>
            </div>
            <div class="border bg-white input">
              <label for="password">
                <input
                  id="password"
                  v-model="user.password"
                  type="password"
                  placeholder="Password"
                  autocomplete="new-password"
                />
              </label>
            </div>
          </div>
          <button type="button" class="btn border submit" @click="submit()">登入</button>
          <router-link :to="{ name: 'sign_up' }" class="btn">註冊帳號</router-link>
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
        email: 'test2@example.com',
        password: 'Test123456',
      },
    };
  },
  methods: {
    submit() {
      this.$store.commit('Load', true);
      const api = `${process.env.VUE_APP_API}/user/sign_in`;
      this.$http
        .post(api, this.user)
        .then((res) => {
          const token = `Bearer ${res.data.user.token}`;

          localStorage.setItem('authorization', token);
          this.$router.push({ name: 'posts_wall' });
        })
        .catch((err) => {
          console.log(err.response.data);
        })
        .then(() => {
          this.$store.commit('Load', false);
        });
    },
  },
};
</script>

<style lang="scss" src="@/assets/scss/site/_sign.scss" scoped></style>
