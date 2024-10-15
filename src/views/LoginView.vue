<template>
  <div class="container">
    <el-card
      class="mx-auto pa-12 pb-8"
      shadow="hover"
    >
      <div class="header-logo center-card">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </div>

      <el-form
        label-position="top"
        label-width="auto"
        :model="formLabelAlign"
        style="min-width:400px; max-width: 600px; display: flex; flex-direction: column"
      >
        <el-form-item label="Email">
          <el-input
            v-model="form.email"
            placeholder="seumail@exemplo.com"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="Senha">
          <el-input
            v-model="form.password"
            :type="visible ? 'text' : 'password'"
            placeholder="Insira sua senha"
            clearable
          >
            <template slot="append">
              <el-button @click="visible = !visible" circle></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-alert
          v-if="showError"
          title="Erro ao fazer login. Verifique suas credenciais."
          type="error"
          show-icon
          class="mb-12"
        ></el-alert>
  
        <el-button
          :disabled="!validForm"
          type="primary"
          size="large"
          class="validade-button"
          block
          @click="handleLogin"
        >
          Acessar
        </el-button>
      </el-form>

      <div class="router-button">
        <router-link to="/create" class="text-blue" style="text-decoration: none">
          Cadastrar agora
        </router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      visible: false,
      showError: false,
    }
  },
  computed: {
    validForm() {
      return this.form.email && this.form.password
    },
  },
  methods: {
    async handleLogin() {
      try {
        await this.$store.dispatch('createUserSessionStore', { userForm: this.form })
        this.showError = false
        return this.$router.push('/home')
      } catch (error) {
        console.error('Error during login:', error)
        this.showError = true
      }
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.router-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0 0 0;
  font-size: small;
}

.text-blue {
  color: rgb(8, 73, 158);
}

.header-logo {
  margin-bottom: 20px;
}

.logo {
  width: 150px;
  height: 150px;
}

.center-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
