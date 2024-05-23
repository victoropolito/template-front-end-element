<template>
  <div>
    <el-button type="danger" icon="el-icon-delete" circle @click="openModal"></el-button>

    <el-dialog v-model="modalOpen" title="Excluir tarefa" :width="600" :modal="true">
      <el-form @submit.prevent="deleteCard">
        <span>Deseja mesmo excluir a tarefa? Essa ação é irreversível!</span>
        <span class="dialog-footer">
          <el-button @click="modalOpen = false">Cancelar</el-button>
          <el-button type="primary" @click="deleteCard">Excluir</el-button>
        </span>
      </el-form>
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
