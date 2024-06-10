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
      <el-form @submit.prevent="submitForm" label-width="auto">
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
      </el-form>
      <span class="dialog-footer">
        <el-button @click="closeModal">Cancelar</el-button>
        <el-button type="primary" @click="submitForm">Salvar</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Edit } from '@element-plus/icons-vue'

export default {
  components: {
    Edit
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
      cards: [],
      editCard: {
        user_id: '664270c9472c3c191f2576e1',
        title: '',
        description: '',
        status: '',
        category_ids: []
      },
      allStatus: ['BACKLOG', 'IN PROGRESS', 'COMPLETED'],
    }
  },
  methods: {
    openModal() {
      this.modalOpen = true
    },
    closeModal() {
      this.resetForm()
      this.modalOpen = false
    },
    resetForm() {
      this.editCard.title = ''
      this.editCard.description = ''
      this.editCard.category_ids = null
      this.editCard.user_id = null
    },
    async submitForm() {
      const id = this.card.id;

      try {
        await this.$store.dispatch('editCard', { cardId: id, updatedCardData: this.editCard })
        this.closeModal()
        return true
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