<template>
  <header>
    <div class="container">
      <router-link to="/" class="btn logo">MetaWall</router-link>
      <div ref="memberWrapper" class="member-wrapper">
        <button type="button" class="member-btn btn" @click="toggle()">
          <img src="../assets/img/user.png" alt="" class="member-photo" />
          <span class="member-text">Member</span>
        </button>
        <div ref="memberDropdown" v-if="select" class="border bg-white dropdown-wrapper">
          <ul class="border bg-white dropdown">
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
  name: 'HeaderCom',
  data() {
    return {
      select: false,
    };
  },
  mounted() {
    document.addEventListener('click', this.memberDropdownClick);
    window.addEventListener('resize', this.memberDropdownOffset);
  },
  updated() {
    if (this.$refs.memberDropdown) {
      this.memberDropdownOffset();
    }
  },
  beforeUnmount() {
    document.removeEventListener('click', this.memberDropdownClick);
    window.removeEventListener('resize', this.memberDropdownOffset);
  },
  methods: {
    toggle() {
      this.select = !this.select;
    },
    memberDropdownClick(e) {
      if (this.$refs.memberDropdown) {
        const isSelf = this.$refs.memberWrapper.contains(e.target);
        if (!isSelf) {
          this.select = false;
        }
      }
    },
    memberDropdownOffset() {
      if (this.$refs.memberDropdown) {
        const rem = getComputedStyle(document.documentElement).fontSize.replace(
          /[^0-9]+(.[0-9]{2})?$/gi,
          '',
        );
        const bodyWidth = document.body.clientWidth;
        const dropdownWidth = this.$refs.memberDropdown.getBoundingClientRect().width;
        const memberX = this.$refs.memberWrapper.getBoundingClientRect().x;
        if (bodyWidth - rem < memberX + dropdownWidth) {
          const offset = bodyWidth - dropdownWidth - memberX - rem + 5;
          this.$refs.memberDropdown.style.transform = `translate(${offset}px,100%)`;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
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
  font-size: 1.625rem;
  font-family: 'Paytone One', sans-serif;
  color: $black;
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
  margin-right: 10px;
  width: 30px;
  height: 30px;
}

.member-text {
  padding: 0 0.25rem 0.25rem 0.25rem;

  border-bottom: 2px solid $black;

  font-weight: Bold;
  font-size: 1rem;
  font-family: 'Azeret Mono', monospace;
}

.dropdown-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;

  transform: translateY(100%);
}

.dropdown {
  transform: translate(-5px, -5px);

  .btn {
    padding: 0.5rem 2.5rem;

    text-align: center;
    &:not(:last-child) {
      border-bottom: 2px solid $black;
    }
    &:hover {
      background: $light-grey;
    }
  }
}
</style>
