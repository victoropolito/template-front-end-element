<template>
  <div>
    <el-button type="primary" icon="Edit" circle @click="openModal"/>

    <el-dialog 
      v-model="modalOpen" 
      :width="600" 
      :modal="true"
      >
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">Editar Tarefa</h4>
        </div>
      </template>
      <el-form @submit.prevent="submitForm" label-width="auto" style="max-width: 600px">
        <el-form-item label="Novo título" :required="true">
          <el-input v-model="editCard.title"></el-input>
        </el-form-item>
        <el-form-item label="Nova descrição" :required="true">
          <el-input type="textarea" v-model="editCard.description"></el-input>
        </el-form-item>
        <el-form-item label="Novo status" :required="true">
          <el-select v-model="editCard.status" placeholder="Selecione">
            <el-option
              v-for="status in allStatus"
              :key="status"
              :label="status"
              :value="status">
            </el-option>
          </el-select>
        </el-form-item>
        <div class="category-modal-container">
          <create-category-modal @category-created="fetchCategories"/>
        </div>
        <el-form-item label="Categorias">
          <el-select v-model="editCard.category_ids" multiple placeholder="Selecione">
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
import { Edit } from '@element-plus/icons-vue'
import { mapState } from 'vuex'
import CreateCategoryModal from './CreateCategoryModal.vue'

export default {
  components: {
    Edit, CreateCategoryModal
  },
  props: {
    card: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      modalOpen: false,
      editCard: {
        title: '',
        description: '',
        status: '',
        category_ids: []
      },
      allStatus: ['BACKLOG', 'IN PROGRESS', 'COMPLETED'],
      categoriesItems: []
    }
  },
  computed: {
    ...mapState(['user']),
    userId() {
      return this.user.id
    },
    categories() {
      return this.$store.state.categories
    },
  },
  methods: {
    openModal() {
      this.modalOpen = true
      this.fetchCategories()
      this.editCard = { ...this.card }
    },
    closeModal() {
      this.resetForm()
      this.modalOpen = false
    },
    resetForm() {
      this.editCard = {
        title: '',
        description: '',
        status: '',
        category_ids: []
      }
    },
    async submitForm() {
      const id = this.card.id

      try {
        await this.$store.dispatch('editCard', { cardId: id, updatedCardData: { ...this.editCard, user_id: this.userId } })
        this.closeModal()
        return true
      } catch (error) {
        throw error
      }
    },
    async fetchCategories() {
      try {
        await this.$store.dispatch('fetchCategoriesStore', this.userId)
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
.category-modal-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2px;
}
</style>