<template>
  <div class="security">
    <VForm v-slot="{ errors }" @submit="updated">
      <!-- 新密碼 -->
      <label class="input-wrapper" for="password">
        <div class="title">輸入新密碼</div>
        <VField
          id="password"
          v-model="password"
          class="border"
          name="新密碼"
          type="password"
          placeholder="請輸入新密碼"
          :rules="{ regex: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/ }"
        />
        <error-message name="新密碼">
          <span class="error-message"> Password 不能小於 8 個字元，需包含大小寫和數字 </span>
        </error-message>
      </label>
      <!-- 再次輸入 -->
      <label class="input-wrapper" for="confirmPassword">
        <div class="title">再次輸入</div>
        <VField
          id="confirmPassword"
          v-model="confirmPassword"
          class="border"
          name="再次輸入"
          type="password"
          placeholder="再次輸入新密碼"
          rules="confirmed:@新密碼"
        />
        <error-message class="error-message" name="再次輸入" />
      </label>
      <button class="btn border submit" type="submit" :disabled="disabled(errors)">重設密碼</button>
    </VForm>
  </div>
</template>

<script>
export default {
  name: 'SecurityView',

  data() {
    return {
      password: '',
      confirmPassword: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    disabled(errors) {
      const { confirmPassword, password } = this
      const err = Object.keys(errors).length
      if (confirmPassword && password && err === 0) return false
      return true
    },
    updated() {
      this.$store.commit('Load', true)
      const api = `${process.env.VUE_APP_API}/user/updatePassword`
      const { headers } = this.$store.state
      const data = {
        password: this.password,
        confirmPassword: this.confirmPassword
      }

      this.$http
        .patch(api, data, headers)
        .then((res) => {
          const token = `Bearer ${res.data.user.token}`
          localStorage.setItem('authorization', token)
          this.$swal({
            title: '密碼已更新',
            icon: 'success',
            customClass: {
              actions: 'customize',
              icon: 'customize'
            }
          })
        })
        .catch((err) => {
          console.error(err)
        })
        .then(() => {
          this.$store.commit('Load', false)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 0.25rem;
}
.input-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  .border {
    padding: 0.75rem 1rem;
  }
}
.error-message {
  margin-top: 0.25rem;

  color: $pink;
  text-align: start;
  font-size: 0.875rem;
}
</style>

