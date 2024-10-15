<template>
  <div class="common-layout">
    <el-container style="padding-top: 5px">
      <el-header class="header" height="auto">
        <div class="header-left">
          <div class="header-logo">
            <img src="@/assets/logo.png" alt="Logo" class="logo">
          </div>
          <el-divider direction="vertical" style="margin-left: 5px;"></el-divider>
        </div>
        <div class="header-center">
          <el-input placeholder="Pesquisar" v-model="searchQuery" class="search-input" />
        </div>
        <div class="header-right">
          <el-dropdown trigger="click">
            <el-avatar size="large">
              <span class="text-h5">{{ userInitials }}</span>
            </el-avatar>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-button type="text">
                    <router-link to="/" style="text-decoration: none; color: inherit">Desconectar</router-link>
                  </el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div class="user-details">
            <b class="user-name">{{ userState.name }}</b>
            <p class="text-caption mt-1">{{ userState.email }}</p>
          </div>
        </div>
      </el-header>
      <el-main class="main">
        <BoardNav class="board-nav" />
        <el-divider></el-divider>
        <Board :userId="userState.id" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Board from '@/components/Board.vue'
import BoardNav from '@/components/BoardNav.vue'
import { mapState } from 'vuex'

export default {
  components: { Board, BoardNav },
  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    ...mapState(['user']),
    userState() {
      return this.user
    },
    userInitials() {
      if (this.user && this.user.name) {
        const nameParts = this.user.name.split(' ')
        const firstNameInitial = nameParts[0].charAt(0)
        const lastNameInitial = nameParts.length > 1 ? nameParts[1].charAt(0) : ''
        return firstNameInitial.toUpperCase() + (lastNameInitial.toUpperCase() ? lastNameInitial.toUpperCase() : '')
      } else {
        return ''
      }
    }
  },
  created() {
    const storedUser = sessionStorage.getItem('user')
    const storedToken = sessionStorage.getItem('token')

    if (storedUser && storedToken) {
      this.$store.commit('setUser', JSON.parse(storedUser))
      this.$store.commit('setToken', storedToken)
    }
  }
}
</script>

<style scoped>
.el-container {
  display: flex;
  flex-direction: column;
}

.el-main {
  height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left,
.header-center,
.header-right {
  display: flex;
  align-items: center;
}

.header-left {
  flex: 1;
  justify-content: flex-start;
}

.header-center {
  flex: 1;
  justify-content: center;
}

.header-right {
  flex: 1;
  justify-content: flex-end;
}

.header-logo {
  margin: 0px 15px 0px 10px;
}

.logo {
  width: 40px;
  height: 40px;
}

.search-input {
  max-width: 500px;
  width: 100%;
}

.user-details {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  padding: 5px;
  text-align: left;
  color: black;
}

.user-name {
  font-weight: bold;
}

.brand-title {
  font-size: larger;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.demo-type {
  display: flex;
}

.demo-type>div {
  flex: 1;
  text-align: center;
}

.demo-type>div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
</style>