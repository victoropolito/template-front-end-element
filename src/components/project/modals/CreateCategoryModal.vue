<template>
  <div>
    <el-button @click="openModal" type="primary" size="small">
      Criar nova categoria
      <el-icon><i class="el-icon-plus"></i></el-icon>
    </el-button>

    <el-dialog v-model="modalOpen" title="Criar nova categoria" :width="500">
      <el-form @submit.prevent="submitForm">
        <el-form-item label="Escolha um texto e uma cor para a nova categoria"></el-form-item>
        <el-form-item label="Nome da categoria" :required="true">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Cor da categoria">
          <el-color-picker v-model="form.color"></el-color-picker>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="modalOpen = false">Cancelar</el-button>
        <el-button type="primary" @click="submitForm">Salvar</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      modalOpen: false,
      form: {
        name: null,
        color: null
      },
    }
  },
  methods: {
    openModal() {
      this.modalOpen = true
    },
    async submitForm() {
      const user_id = '664270c9472c3c191f2576e1'

      try {
        await this.$store.dispatch('createCategoryStore', { userId: user_id, categoryForm: this.form })
        this.modalOpen = false
        return true
      } catch (error) {
        throw error
      }
    },
  },
  computed: {
    ...mapState(['user']),
    userState() {
      return this.user;
    }
  },
}
</script>
