<template>
  <el-container>
    <el-row type="flex" justify="space-between" align="middle" class="board-nav">
      <el-col>
        <el-icon class="mr-2">
          <i class="el-icon-infinite"></i>
        </el-icon>
        <span class="brand-title">Projeto Chameleon</span>
      </el-col>
      <el-col>
        <create-issue-modal v-model:visible="dialog"></create-issue-modal>
      </el-col>
    </el-row>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import CreateIssueModal from './project/modals/CreateIssueModal.vue'

const dialog = ref(false)
</script>

<style scoped>
.board-nav {
  margin-bottom: 20px;
}

.brand-title {
  font-size: larger;
  font-weight: bold;
  display: flex;
  align-items: center;
}
</style>
