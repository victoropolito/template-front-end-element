<template>
  <div>
    <el-button type="primary" icon="el-icon-edit" circle @click="openModal"></el-button>

    <el-dialog v-model="modalOpen" title="Editar Tarefa" :width="600" :modal="true">
      <el-form @submit.prevent="submitForm">
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
export default {
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
