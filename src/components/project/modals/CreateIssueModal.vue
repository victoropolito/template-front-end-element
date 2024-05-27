<template>
  <div>
    <el-button type="primary" size="large" @click="openModal">
      <b>NOVA TASK</b>
    </el-button>

    <el-dialog v-model="modalOpen" title="Adicionar Nova Tarefa" :width="600" :modal="true">
      <el-form @submit.prevent="submitForm">
        <el-form-item label="Título da Tarefa" :required="true">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="Descrição" :required="true">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="Categorias">
          <create-category-modal />
          <el-select v-model="form.category_ids" multiple placeholder="Selecione">
            <el-option
              v-for="category in categoriesItems"
              :key="category.id"
              :label="category.name"
              :value="category.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Usuário" :required="true">
          <el-select v-model="form.user_id" placeholder="Selecione">
            <el-option
              v-for="user in users"
              :key="user"
              :label="user"
              :value="user">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="closeModal">Cancelar</el-button>
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
        user_id: '',
      },
      categoriesItems: [],
      users: ['664270c9472c3c191f2576e1', 'Usuário 2', 'Usuário 3'],
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
