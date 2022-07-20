<template>
  <div class="account">
    <VForm v-slot="{ errors }" @submit="updated">
      <!-- 頭像 -->
      <div class="user-photo border circle">
        <img @load="successLoadImg" :src="user.photo" alt="" class="hide" />
      </div>
      <!-- 上傳按鈕 -->
      <div class="upload-wrapper">
        <label for="uploadImage" class="upload btn radius">
          上傳大頭照
          <VField
            id="uploadImage"
            name="uploadImage"
            type="file"
            class="hide"
            @change="upload(errors)"
            :rules="{ ext: ['jpg', 'png', 'jpeg'] }"
          />
        </label>
        <error-message name="uploadImage">
          <div class="error-message">圖片格式錯誤，僅限 JPG、PNG 圖片</div>
        </error-message>
        <div v-if="errMessage" class="error-message">{{ errMessage }}</div>
      </div>
      <!-- 暱稱 -->
      <label for="name" class="name-wrapper">
        <div class="title">暱稱</div>
        <VField
          id="name"
          name="暱稱"
          v-model="user.name"
          placeholder="輸入您的暱稱"
          class="name border"
          :rules="{ required: true, min: 2, max: 13 }"
        />
        <error-message class="error-message" name="暱稱" />
      </label>
      <!-- 性別 -->
      <div class="sex-wrapper">
        <div class="title">性別</div>
        <label for="male" class="radio-wrapper">
          <input type="radio" id="male" v-model="user.sex" value="male" class="radio" />
          <span class="radio-button"></span>
          男性
        </label>
        <label for="female" class="radio-wrapper">
          <input type="radio" id="female" v-model="user.sex" value="female" class="radio" />
          <span class="radio-button"></span>
          女性
        </label>
      </div>
      <!-- 送出按鈕 -->
      <button type="submit" class="btn border submit" :disabled="disabled(errors)">送出更新</button>
    </VForm>
  </div>
</template>

<script>
export default {
  name: 'AccountView',
  data() {
    return {
      user: {
        photo: '',
        name: '',
        sex: '',
      },
      errMessage: '',
    };
  },
  computed: {
    tempUser() {
      const { user } = this.$store.state;
      return user;
    },
    compare() {
      const { tempUser } = this;
      const { user } = this;
      const compare = [
        user.photo !== tempUser.photo,
        user.name !== tempUser.name,
        user.sex !== tempUser.sex,
      ].includes(true);
      return compare;
    },
  },
  watch: {
    tempUser: {
      handler() {
        const user = this.tempUser;
        this.user = {
          photo: user.photo,
          name: user.name,
          sex: user.sex || 'male',
        };
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async upload(errors) {
      this.errMessage = '';
      if (errors.uploadImage === undefined) {
        this.$store.commit('Load', true);
        const uploadedFile = document.getElementById('uploadImage').files[0];
        const formData = new FormData();
        formData.append('file-to-upload', uploadedFile);
        const api = `${process.env.VUE_APP_API}/upload/avatar`;
        const { headers } = this.$store.state;
        this.$http
          .post(api, formData, headers)
          .then((res) => {
            const { imgUrl } = res.data;
            this.user.photo = imgUrl;
          })
          .catch((err) => {
            this.errMessage = err.response.data.message;
          })
          .then(() => {
            this.$store.commit('Load', false);
          });
      }
    },
    updated() {
      this.$store.commit('Load', true);
      const api = `${process.env.VUE_APP_API}/user/profile`;
      const { headers } = this.$store.state;
      const data = {};
      const { tempUser } = this;
      const newUser = this.user;
      if (newUser.name !== tempUser.name) data.name = newUser.name;
      if (
        // eslint-disable-next-line operator-linebreak
        newUser.photo !== tempUser.photo &&
        newUser.photo !== `${process.env.VUE_APP_USER_PHOTO}`
      ) {
        data.photo = newUser.photo;
      }
      if (newUser.sex !== tempUser.sex) data.sex = newUser.sex;

      this.$http
        .patch(api, data, headers)
        .then((res) => {
          const { user } = res.data;
          delete user.followers;
          delete user.following;
          if (user.photo === '') user.photo = `${process.env.VUE_APP_USER_PHOTO}`;

          this.$store.commit('user', user);
          this.$swal({
            title: '資料已更新',
            icon: 'success',
            customClass: {
              actions: 'customize',
              icon: 'customize',
            },
          });
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          this.$store.commit('Load', false);
        });
    },
    disabled(errors) {
      const err = Object.keys(errors).length;
      if (this.user.name && err === 0 && this.compare) return false;
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.user-photo {
  margin: 0 auto 1rem auto;
  width: 6.75rem;
  height: 6.75rem;
}

.upload-wrapper {
  margin-bottom: 1rem;
  .error-message {
    text-align: center;
  }
}

.upload {
  margin: 0 auto;
  padding: 0.25rem 2rem;
  width: fit-content;

  background: $black;

  color: $white;
  line-height: 1.5em;
  &:hover {
    background: $blue-dark;
  }
}

.title {
  margin-bottom: 0.25rem;
}

.name-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  .border {
    padding: 0.75rem 1rem;
  }
}

.sex-wrapper {
  margin-bottom: 2rem;
}

.radio-wrapper {
  display: inline-flex;
  align-items: center;
  &:not(:last-child) {
    margin-right: 1.5rem;
  }
}

.radio {
  display: none;
  &:checked ~ .radio-button::after {
    opacity: 1;
  }
}

.radio-button {
  position: relative;
  margin-right: 0.75rem;
  width: 1.25rem;
  height: 1.25rem;

  border: 2px solid $black;
  border-radius: 50%;
}

.radio-button::after {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0.625rem;
  height: 0.625rem;

  border-radius: 50%;
  background-color: $black;

  content: '';

  opacity: 0;
  transition: $transition-1;
  transform: translate(-50%, -50%);
}

.error-message {
  margin-top: 0.25rem;

  color: $pink;
  text-align: start;

  font-size: 0.875rem;
}
</style>
