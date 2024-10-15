<template>
  <div class="container">
    <el-card class="mx-auto pa-12 pb-8" shadow="hover">
      <div class="header-logo center-card">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </div>

      <el-form label-position="top" label-width="auto" :model="formLabelAlign"
        style="min-width:400px; max-width: 600px; display: flex; flex-direction: column">
        <el-form-item label="Nome">
          <el-input v-model="form.name" placeholder="Nome & Sobrenome" clearable />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email" placeholder="seumail@exemplo.com" clearable></el-input>
        </el-form-item>
        <el-form-item label="Senha">
          <el-input v-model="form.password" :type="visible ? 'text' : 'password'" placeholder="Insira sua senha"
            clearable>
            <template slot="append">
              <el-button @click="visible = !visible" circle></el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <div class="avatar-form-item">
            <el-avatar size="large">
              <el-button icon="el-icon-camera" circle>
                <input type="file" ref="fileInput" class="file-input" @change="handleFileUpload" />
              </el-button>
            </el-avatar>
          </div>
        </el-form-item>

        <el-button @click="submitForm" type="primary" size="large" block>
          <router-link to="/">
            <b>Criar novo usuário</b>
          </router-link>
        </el-button>
      </el-form>

      <div class="router-button">
        <router-link to="/" class="text-blue">
          Voltar <el-icon><i class="el-icon-arrow-right"></i></el-icon>
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
        name: null,
        email: null,
        password: null,
        photo: null,
      },
      visible: false,
    };
  },
  methods: {
    async submitForm() {
      try {
        await this.$store.dispatch('createUserStore', { userForm: this.form });
        return true;
      } catch (error) {
        throw error;
      }
    },
    handleFileUpload() {
      const file = this.$refs.fileInput.files[0];
      console.log('Arquivo selecionado:', file);
    },
  },
};
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
  text-decoration: none;
}

.text-decoration-none {
  text-decoration: none;
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

.avatar-form-item {
  display: flex;
  justify-items: center;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>