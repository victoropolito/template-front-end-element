<template>
  <div>
    <el-button @click="openModal" type="primary" size="small" icon="Plus">
      Criar nova categoria
    </el-button>

    <el-dialog 
      v-model="modalOpen" 
      :width="400"
      >
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">Criar nova categoria</h4>
        </div>
      </template>

      <el-form @submit.prevent="submitForm" label-width="auto" label-position="top">
        <el-form-item label="Nome da categoria" :required="true">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Cor da categoria" :required="true">
          <el-color-picker v-model="form.color" size="large"></el-color-picker>
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
import { Plus } from '@element-plus/icons-vue'

export default {
  components: {
    Plus
  },
  data() {
    return {
      modalOpen: false,
      form: {
        name: null,
        color: null
      },
    }
  },
  computed: {
    ...mapState(['user']),
    userId() {
      return this.user.id
    }
  },
  methods: {
    openModal() {
      this.modalOpen = true
    },
    async submitForm() {    
      try {
        await this.$store.dispatch('createCategoryStore', { userId: this.userId, categoryForm: this.form })
        this.modalOpen = false
        this.$emit('category-created')
      } catch (error) {
        throw error
      }
    },
  },

}
</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}
</style>