<template>
  <el-col :span="8">
    <el-card class="box-card">
      <template #header>
        <div class="header clearfix">
          <span>{{ statusLabel }}</span>
          <span class="card-header-count">{{ cards.length }}</span>
        </div>
      </template>
      <el-card v-for="card in cards" :key="card.id" class="inner-card">
        <template #header>
          <h3><b>{{ card.title }}</b></h3>
        </template>
        <div>
          <el-tag v-for="category in card.categories" 
            :key="category.name" 
            :style="{ backgroundColor: category.color, color: 'white' }" 
            class="tag-margin"
            round
          >
            {{ category.name }}
          </el-tag>
        </div>
        <div><i>{{ card.description }}</i></div>
        <div class="card-actions">
          <el-button type="primary" size="mini">
            <edit-issue-modal :card="card" />
          </el-button>
          <el-button type="danger" size="mini">
            <delete-issue-modal :card="card" />
          </el-button>
        </div>
      </el-card>
    </el-card>
  </el-col>
</template>

<script>
import DeleteIssueModal from '@/components/project/modals/DeleteIssueModal.vue';
import EditIssueModal from '@/components/project/modals/EditIssueModal.vue';

export default {
  components: { EditIssueModal, DeleteIssueModal },
  props: {
    statusLabel: {
      type: String,
      required: true
    },
    cards: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
:root {
  --header-count-bg: lightgray;
  --card-margin: 10px;
  --inner-card-margin: 10px 0;
}

.box-card {
  margin: var(--card-margin);
  border-radius: 3px;
  padding: 10px;
  box-shadow: 0 0 1px black;
}

.inner-card {
  margin: var(--inner-card-margin);
}

.tag-margin {
  margin: 0 1px 1px 0;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
}

.card-header-count {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: smaller;
  color: rgba(66, 66, 66, 0.664);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--header-count-bg);
}
</style>
