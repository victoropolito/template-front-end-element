<template>
  <div>
    <el-button type="primary" size="large" @click="openModal">
      <b>Nova Task</b>
    </el-button>

    <el-dialog 
      v-model="modalOpen" 
      :width="600" 
      >
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">Adicionar nova tarefa</h4>
        </div>
      </template>
      <el-form @submit.prevent="submitForm" label-width="auto" style="max-width: 600px">
        <el-form-item label="Título da Tarefa" :required="true">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="Descrição" :required="true">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <create-category-modal style="margin-bottom: 5px;"/>
        <el-form-item label="Categorias">
          <el-select v-model="form.category_ids" multiple placeholder="Selecione">
            <el-option
              v-for="category in categoriesItems"
              :key="category.id"
              :label="category.name"
              :value="category.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="closeModal" plain>Cancelar</el-button>
        <el-button type="primary" @click="submitForm">Salvar</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CreateCategoryModal from './CreateCategoryModal.vue'

export default {
  components: { CreateCategoryModal },
  data() {
    return {
      modalOpen: false,
      form: {
        title: '',
        description: '',
        status: 'BACKLOG',
        category_ids: [],
        user_id: '664270c9472c3c191f2576e1',
      },
      categoriesItems: [],
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories
    }
  },
  methods: {
    openModal() {
      this.modalOpen = true
      this.fetchCategories()
    },
    closeModal() {
      this.modalOpen = false
      this.resetForm()
    },
    resetForm() {
      this.form = {
        title: '',
        description: '',
        status: 'BACKLOG',
        category_ids: [],
        user_id: '',
      }
    },
    async submitForm() {
      try {
        await this.$store.dispatch('createCardStore', {
          userId: this.form.user_id,
          cardForm: this.form,
        })
        this.closeModal()
      } catch (error) {
        console.error('Erro ao salvar tarefa:', error)
        alert('Erro ao salvar tarefa. Tente novamente.')
      }
    },
    async fetchCategories() {
      try {
        await this.$store.dispatch('fetchCategoriesStore', '664270c9472c3c191f2576e1')
        this.categoriesItems = this.categories.map(category => ({
          id: category.id,
          name: category.name,
        }))
      } catch (error) {
        console.error('Erro ao obter categorias:', error)
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