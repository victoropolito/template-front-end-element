<template>
  <div>
    <el-button type="danger" icon="Delete" @click="openModal" />
    <el-dialog 
      v-model="modalOpen" 
      :width="500" 
      :modal="true"
      >
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">Excluir tarefa?</h4>
        </div>
      </template>
      <span>Deseja mesmo excluir a tarefa? Essa ação é irreversível!</span>
      <template #footer>
        <el-button @click="modalOpen = false">Cancelar</el-button>
        <el-button type="danger" @click="deleteCard">Excluir</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { Delete } from '@element-plus/icons-vue'

export default {
  components: {
    Delete
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
    }
  },
  methods: {
    openModal() {
      this.modalOpen = true
    },
    async deleteCard() {
      const id = this.card.id;

      try {
        await this.$store.dispatch('deleteCardStore', id);
        this.modalOpen = false
        return true;
      } catch (error) {
        console.error('Error deleting card:', error);
        throw error;
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