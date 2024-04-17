<template>
  <div class="sign-up-view">
    <div class="middle">
      <div class="container border">
        <img class="cursor-none hide" :src="bg" alt="" @load="successLoadImg" />
        <div class="auth-content">
          <h2 class="cursor-none">MetaWall</h2>
          <h3>到元宇宙展開全新社交圈</h3>
          <VForm v-slot="{ errors }" @submit="signUp">
            <div class="input-group">
              <label class="input-wrapper" for="name">
                <VField
                  id="name"
                  v-model="user.name"
                  class="border"
                  name="暱稱"
                  type="name"
                  placeholder="暱稱"
                  :rules="{ required: true, min: 2, max: 13 }"
                  autocomplete="new-password"
                />
                <error-message name="暱稱" />
              </label>
              <label class="input-wrapper" for="email">
                <VField
                  id="email"
                  v-model="user.email"
                  class="border"
                  name="Email"
                  type="email"
                  placeholder="Email"
                  :rules="{ required: true, email: true }"
                  autocomplete="new-password"
                />
                <error-message name="Email" />
              </label>
              <label class="input-wrapper" for="password">
                <VField
                  id="password"
                  v-model="user.password"
                  class="border"
                  name="Password"
                  type="password"
                  placeholder="Password"
                  :rules="{ regex: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/ }"
                  autocomplete="new-password"
                />
                <error-message name="Password">
                  <span> Password 不能小於 8 個字元，需包含大小寫和數字 </span>
                </error-message>
              </label>
            </div>
            <div v-if="message" class="error-message">{{ message }}</div>
            <button class="btn border submit" type="submit" :disabled="disabled(errors)">
              註冊
            </button>
          </VForm>
          <router-link class="btn link" :to="{ name: 'sign_in' }">登入</router-link>
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
        password: ''
      },
      message: '',
      bg: process.env.VUE_APP_SIGN_BG
    }
  },
  watch: {
    user: {
      handler() {
        if (this.message) {
          this.message = ''
        }
      },
      deep: true
    }
  },
  methods: {
    signUp() {
      this.$store.commit('Load', true)
      const api = `${process.env.VUE_APP_API}/user/sign_up`
      this.$http
        .post(api, this.user)
        .then((res) => {
          const token = `Bearer ${res.data.user.token}`
          localStorage.setItem('authorization', token)
          this.$router.push({ name: 'posts_wall' })
        })
        .catch((err) => {
          const { message } = err.response.data
          this.message = message
        })
        .then(() => {
          this.$store.commit('Load', false)
        })
    },
    disabled(errors) {
      const { name, email, password } = this.user
      const err = Object.keys(errors).length
      if (name && email && password && err === 0) return false
      return true
    }
  }
}
</script>

<style lang="scss" src="@/assets/scss/site/_sign.scss" scoped></style>

