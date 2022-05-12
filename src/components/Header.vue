<template>
  <header class="header">
    <div class="container">
      <div class="logo">MetaWall</div>
      <div ref="memberWrapper" class="member-wrapper">
        <div class="member-btn btn" @click="toggle()" @keydown="toggle()">
          <img src="../assets/img/user.png" alt="" class="member-photo" />
          <span class="member-text">Member</span>
        </div>
        <div
          ref="memberDropdown"
          v-if="select"
          class="dropdown-wrapper"
        >
          <ul class="dropdown">
            <li class="btn">我的貼文牆</li>
            <li class="btn">修改個人資料</li>
            <li class="btn">登出</li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      select: false,
    };
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if (this.$refs.memberDropdown) {
        const isSelf = this.$refs.memberWrapper.contains(e.target);
        if (!isSelf) {
          this.select = false;
        }
      }
    });
  },
  methods: {
    toggle() {
      this.select = !this.select;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: $h-header;
  border-bottom: 3px solid $black;
  background: $white;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 100%;
}

.logo {
  font-family: 'Paytone One', sans-serif;
  font-size: 1.625rem;
}

.member-wrapper {
  position: relative;

  height: 100%;
}

.member-btn {
  display: flex;
  align-items: center;

  height: 100%;
}

.member-photo {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.member-text {
  border-bottom: 2px solid $black;
  padding: 0 0.25rem 0.25rem 0.25rem;
  font-family: 'Azeret Mono', monospace;
  font-size: 1rem;
  font-weight: Bold;
}

.dropdown-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;

  border: 2px solid $black;
  background: $white;
  transform: translateY(100%);
}

.dropdown {
  border: 2px solid $black;
  background: $white;
  transform: translate(-5px, -5px);

  .btn {
    padding: 0.5rem 2.5rem;
    text-align: center;
    white-space: nowrap;
    transition: $transition-1;

    &:not(:last-child) {
      border-bottom: 2px solid $black;
    }

    &:hover {
      background: $light-grey;
    }
  }
}
</style>
