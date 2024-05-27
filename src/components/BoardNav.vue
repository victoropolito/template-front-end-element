<template>
  <el-row justify="space-between" class="custom-row">
    <el-col :span="12" class="left-align">
      <div class="brand-title">Projeto Chameleon</div>
    </el-col>
    <el-col :span="12" class="right-align">
      <create-issue-modal></create-issue-modal>
    </el-col>
  </el-row>
</template>

<script setup>
import CreateIssueModal from './project/modals/CreateIssueModal.vue'
</script>

<style scoped>
.custom-row {
  width: 100%;
}

.left-align {
  text-align: left;
}

.right-align {
  text-align: right;
}

.board-nav {
  margin-bottom: 20px;
  max-height: 300px;
  overflow: auto;
  display: flex;
  justify-content: space-between;
}

.brand-title {
  font-size: larger;
  display: flex;
  align-items: center;
  color: black;
}
</style>