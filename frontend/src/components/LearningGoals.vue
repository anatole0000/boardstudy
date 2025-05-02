<template>
  <div class="goals">
    <h2>📚 Learning Goals</h2>

    <form @submit.prevent="addGoal" class="goal-form">
      <div class="input-group">
        <label for="goal-title">Goal Title</label>
        <input id="goal-title" v-model="newGoal.title" placeholder="Enter goal title" required />
      </div>
      
      <div class="input-group">
        <label for="goal-description">Description</label>
        <textarea id="goal-description" v-model="newGoal.description" placeholder="Enter a detailed description of the goal" rows="4"></textarea>
      </div>
      
      <div class="input-group">
        <label for="goal-deadline">Deadline</label>
        <input id="goal-deadline" type="date" v-model="newGoal.deadline" />
      </div>

      <div class="input-group">
        <label for="goal-status">Status</label>
        <select id="goal-status" v-model="newGoal.status">
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button type="submit" class="submit-button">{{ editingId ? 'Update' : 'Add' }}</button>
    </form>

    <!-- 📊 Chart -->
    <GoalStatusChart :goals="goals" />
    <CompletedGoalsChart :goals="goals" />

    <!-- 📋 Goals List -->
    <ul class="goals-list">
      <li v-for="goal in goals" :key="goal._id" class="goal-item">
        <b>{{ goal.title }}</b> ({{ goal.status }})<br />
        <small>{{ goal.description }}</small><br />
        <small>Deadline: {{ formatDate(goal.deadline) }}</small><br />
        <div class="goal-actions">
          <button @click="editGoal(goal)" class="edit-button">✏️ Edit</button>
          <button @click="deleteGoal(goal._id)" class="delete-button">🗑 Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../api';
import GoalStatusChart from '../components/GoalStatusChart.vue';
import CompletedGoalsChart from '../components/CompletedGoalsChart.vue';

export default {
  components: {
    GoalStatusChart,
    CompletedGoalsChart
  },
  data() {
    return {
      goals: [],
      newGoal: {
        title: '',
        description: '',
        deadline: '',
        status: 'not-started',
      },
      editingId: null,
    };
  },
  async mounted() {
    const res = await api.get('/goals');
    this.goals = res.data;
  },
  methods: {
    formatDate(dateStr) {
      return dateStr ? new Date(dateStr).toLocaleDateString() : '';
    },
    async addGoal() {
      if (this.editingId) {
        const res = await api.put(`/goals/${this.editingId}`, this.newGoal);
        const index = this.goals.findIndex(g => g._id === this.editingId);
        this.goals[index] = res.data;
        this.editingId = null;
      } else {
        const res = await api.post('/goals', this.newGoal);
        this.goals.unshift(res.data);
      }
      this.newGoal = { title: '', description: '', deadline: '', status: 'not-started' };
    },
    editGoal(goal) {
      this.newGoal = { ...goal };
      this.editingId = goal._id;
    },
    async deleteGoal(id) {
      await api.delete(`/goals/${id}`);
      this.goals = this.goals.filter(g => g._id !== id);
    },
  },
};
</script>

<style scoped>
/* General form styling */
.goal-form {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 16px;
}

.input-group label {
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

.input-group input,
.input-group select,
.input-group textarea {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.input-group textarea {
  resize: vertical;
}

.submit-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #45a049;
}

/* Goals List Styling */
.goals-list {
  list-style: none;
  padding: 0;
}

.goal-item {
  margin-bottom: 20px;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  transition: box-shadow 0.3s;
}

.goal-item:hover {
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
}

.goal-actions {
  margin-top: 12px;
}

.edit-button,
.delete-button {
  padding: 6px 12px;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-button {
  background-color: #f1c40f;
}

.delete-button {
  background-color: #e74c3c;
}

.edit-button:hover {
  background-color: #f39c12;
}

.delete-button:hover {
  background-color: #c0392b;
}
</style>
