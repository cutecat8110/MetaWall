<template>
  <div class="post">
    <Title :title="'張貼動態'" />
    <VForm v-slot="{ errors }" @submit="createPosts" class="border bg-white radius">
      <label for="content" class="content-wrapper"
        >貼文內容
        <VField
          refs="ee"
          id="content"
          name="內容"
          v-model="content"
          placeholder="輸入您的貼文內容"
          class="content border"
          rules="required"
          as="textarea"
        />
        <error-message name="內容" />
      </label>
      <label for="uploadImage" class="btn upload">
        上傳圖片
        <VField
          id="uploadImage"
          name="uploadImage"
          type="file"
          class="hide"
          @change="upload(errors)"
          :rules="{ ext: ['jpg', 'png', 'jpeg'] }"
        />
      </label>
      <div class="image-wrapper border radius">
        <div class="clamp" :style="paddingBottom">
          <div v-if="!image" class="cover border cursor-none radius">
            <span class="material-icons"> image </span>
          </div>
          <template v-if="image">
            <img ref="postsPhoto" @load="successLoadImg, size()" :src="image" alt="" class="hide" />
            <button type="button" class="btn border clear circle" @click="clearImg">
              <span class="material-icons"> close </span>
            </button>
          </template>
        </div>
      </div>
      <error-message name="uploadImage">
        <div class="error-message">圖片格式錯誤，僅限 JPG、PNG 圖片</div>
      </error-message>
      <div v-if="errMessage" class="error-message">{{ errMessage }}</div>
      <div class="submit-wrapper">
        <button type="submit" class="btn border submit" :disabled="disabled(errors)">
          送出貼文
        </button>
      </div>
    </VForm>
  </div>
</template>

<script>
import Title from '@/components/Title.vue';

export default {
  name: 'PostView',
  components: {
    Title,
  },
  data() {
    return {
      content: '',
      image: '',
      err: true,
      errMessage: '',
      paddingBottom: {},
    };
  },
  methods: {
    createPosts() {
      this.$store.commit('Load', true);
      const api = `${process.env.VUE_APP_API}/post`;
      const { headers } = this.$store.state;

      const data = {
        user: this.$store.state.user._id,
        image: this.image,
        content: this.content,
      };
      this.$http
        .post(api, data, headers)
        .then(() => {
          this.$router.push({ name: 'posts_wall' });
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          this.$store.commit('Load', false);
        });
    },
    async upload(errors) {
      this.errMessage = '';
      this.image = '';
      if (errors.uploadImage === undefined) {
        this.$store.commit('Load', true);
        const uploadedFile = document.getElementById('uploadImage').files[0];
        const formData = new FormData();
        formData.append('file-to-upload', uploadedFile);
        const api = `${process.env.VUE_APP_API}/upload/post`;
        const { headers } = this.$store.state;
        this.$http
          .post(api, formData, headers)
          .then((res) => {
            const { imgUrl } = res.data;
            this.image = imgUrl;
          })
          .catch((err) => {
            this.errMessage = err.response.data.message;
          })
          .then(() => {
            this.$store.commit('Load', false);
          });
      }
    },
    clearImg() {
      this.image = '';
      this.paddingBottom = {
        paddingBottom: '52.35%',
      };
    },
    disabled(errors) {
      const err = Object.keys(errors).length;
      if (this.content && err === 0) return false;
      return true;
    },
    size() {
      if (this.$refs.postsPhoto) {
        const { height } = this.$refs.postsPhoto;
        const { width } = this.$refs.postsPhoto;
        const ratio = (height / width) * 100;
        this.paddingBottom = {
          paddingBottom: ratio > 150 ? '150%' : `${ratio}%`,
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  display: grid;
  grid-gap: 1rem;
}

form {
  padding: 2rem;
}

.content-wrapper {
  display: block;
  margin-bottom: 1rem;

  font-weight: Normal;
  font-size: 1rem;
  span {
    color: $pink;
    font-size: 0.875rem;
  }
}

.content {
  display: block;
  margin-top: 0.25rem;
  padding: 0.75rem 1rem;
  width: 100%;
  height: 10.5rem;

  outline: none;

  resize: none;
}

.upload {
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.25rem 2rem;

  border-radius: 0.25rem;
  background: $black;

  color: $white;
  line-height: 1.5em;
  &:hover {
    background: $blue-dark;
  }
}

.image-wrapper {
  overflow: hidden;
  margin-bottom: 2rem;

  background: $blue-light;

  .clamp {
    position: relative;
    padding-bottom: 52.35%;
  }
  .clear {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;

    background: $blue-light;
    &:hover {
      background: $blue-dark;

      color: $white;

      transition: $transition-1;
    }
  }

  img {
    position: absolute;
    display: block;
    width: 100%;
  }
  .cover {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);

    border: 2px dashed $grey-translucent;

    color: $grey-translucent;
    vertical-align: middle;
    font-size: 1.25rem;

    transform: translate(-50%, -50%);
    span {
      font-size: 5.75rem;
    }
  }
}

.error-message {
  margin-bottom: 1rem;

  text-align: center;
}

.submit-wrapper {
  padding: 0 4.5rem;
}
</style>
