<template>
  <el-container>
    <el-row gutter={20}>
      <!-- Not Started Column -->
      <el-col :span="8">
        <el-card class="box-card">
          <div class="clearfix">
            <span>Não iniciado</span>
            <span class="card-header-count">{{ filteredCards('BACKLOG').length }}</span>
          </div>
          <el-card v-for="card in filteredCards('BACKLOG')" :key="card.id" class="inner-card">
            <div class="clearfix">
              <el-avatar src="https://cdn.vuetifyjs.com/images/john.jpg"></el-avatar>
              <span>{{ card.title }}</span>
            </div>
            <div>
              <el-tag v-for="category in card.categories" 
                :key="category.name" 
                :style="{ backgroundColor: category.color }" 
                class="tag-margin">
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
      
      <!-- In Progress Column -->
      <el-col :span="8">
        <el-card class="box-card">
          <div class="clearfix">
            <span>Em Progresso</span>
            <span class="card-header-count">{{ filteredCards('IN PROGRESS').length }}</span>
          </div>
          <el-card v-for="card in filteredCards('IN PROGRESS')" :key="card.id" class="inner-card">
            <div class="clearfix">
              <el-avatar src="https://cdn.vuetifyjs.com/images/john.jpg"></el-avatar>
              <span>{{ card.title }}</span>
            </div>
            <div>
              <el-tag v-for="category in card.categories" 
                :key="category.name" 
                :style="{ backgroundColor: category.color }" 
                class="tag-margin">
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
      
      <!-- Completed Column -->
      <el-col :span="8">
        <el-card class="box-card">
          <div class="clearfix">
            <span>Concluído</span>
            <span class="card-header-count">{{ filteredCards('COMPLETED').length }}</span>
          </div>
          <el-card v-for="card in filteredCards('COMPLETED')" :key="card.id" class="inner-card">
            <div class="clearfix">
              <el-avatar src="https://cdn.vuetifyjs.com/images/john.jpg"></el-avatar>
              <span>{{ card.title }}</span>
            </div>
            <div>
              <el-tag v-for="category in card.categories" 
                :key="category.name" 
                :style="{ backgroundColor: category.color }" 
                class="tag-margin">
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
    </el-row>
  </el-container>
</template>

<script>
import DeleteIssueModal from './project/modals/DeleteIssueModal.vue';
import EditIssueModal from './project/modals/EditIssueModal.vue'

export default {
  components: { EditIssueModal, DeleteIssueModal },
  props: {
    userId: {
      type: String,
      required: true
    },
  },
  computed: {
    cards() {
      return this.$store.state.cards
    },
  },
  mounted() {
    if(!this.cards.length){
      this.fetchCards()
    }
  },
  methods: {
    async fetchCards() {
      try {
        const user_id = this.userId
        await this.$store.dispatch('fetchCardsAction', user_id)
      } catch (error) {
        console.error('Error fetching cards:', error)
      }
    },
    filteredCards(status) {
      return this.cards.filter(card => card.status === status)
    },
  },
}
</script>

<style scoped>
.box-card {
  margin: 10px;
  border-radius: 3px;
  padding: 10px;
  box-shadow: 0 0 1px black;
}

.inner-card {
  margin: 10px 0;
}

.tag-margin {
  margin: 0 1px 1px 0;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
