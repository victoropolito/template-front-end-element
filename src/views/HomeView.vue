<template>
  <el-container>
    <el-header class="header" height="auto">
      <!-- Logo space -->
      <div class="header-logo">
        <a href="#">
          <img src="@/assets/logo.png" alt="Logo" class="logo">
        </a>
      </div>
      <el-divider direction="vertical" style="margin-left: 5px;"></el-divider>
      
      <!-- Search input -->
      <el-input 
        placeholder="Procurar" 
        prefix-icon="el-icon-search"
        style="margin-top: 20px; text-align: center;"
        v-model="searchQuery">
      </el-input>

      <!-- Spacer -->
      <div style="flex-grow: 1;"></div>

      <!-- Notifications and avatar space -->
      <el-dropdown trigger="click" style="margin-right: 20px;">
        <span class="el-dropdown-link">
          <el-avatar size="large" class="el-avatar-icon" style="background-color: blue;">
            <span class="text-h5">{{ userInitials }}</span>
          </el-avatar>
        </span>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-avatar size="large" style="background-color: blue; margin-bottom: 10px;">
              <span class="text-h5">{{ userInitials }}</span>
            </el-avatar>
            <div>
              <el-button type="text" style="width: 100%;">Editar Conta</el-button>
            </div>
            <el-divider></el-divider>
            <div>
              <el-button type="text" style="width: 100%;">
                <router-link to="/">Desconectar</router-link>
              </el-button>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      
      <div class="user-details">
        <b>{{ userState.name }}</b>
        <p class="text-caption mt-1">{{ userState.email }}</p>
      </div>
    </el-header>
    
    <!-- Main content -->
    <el-main>
      <BoardNav />
      <el-divider></el-divider>
      <Board :userId="userState.id" />
    </el-main>
  </el-container>
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
.header {
  display: flex;
  text-align: center;
  margin: auto;
  align-items: center;
}

.header-logo {
  margin: 0px 15px 0px 10px;
}

.logo {
  width: 40px;
  height: 40px;
}

.user-details {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  padding: 5px;
  text-align: left;
}
</style>
