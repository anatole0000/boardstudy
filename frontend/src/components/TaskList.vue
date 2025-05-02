<template>
  <div class="task-list">
    <h2>📘 Study To-Do List</h2>
    <div class="input-container">
      <input 
        v-model="newTask" 
        @keyup.enter="addTask" 
        placeholder="Add a task..." 
        ref="taskInput"
      />
      <button @click="addTask">Add Task</button>
    </div>

    <!-- Task Progress Chart -->
    <TaskProgressChart :tasks="tasks" />

    <ul>
      <li v-for="task in tasks" :key="task._id">
        <label>
          <input 
            type="checkbox" 
            :checked="task.completed" 
            @change="toggleTask(task)" 
          />
          <span 
            :style="{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#888' : '#000' }"
          >
            {{ task.title }}
            <span v-if="task.priority" class="priority-badge" :class="{high: task.priority === 'High', medium: task.priority === 'Medium', low: task.priority === 'Low'}" > {{ task.priority }}</span>
          </span>

        </label>
        <button @click="deleteTask(task._id)">🗑</button>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../api';
import TaskProgressChart from './TaskProgressChart.vue';

export default {
  components: { TaskProgressChart },
  data() {
    return {
      tasks: [],
      newTask: '',
    };
  },
  async mounted() {
    try {
      const res = await api.get('/tasks');
      this.tasks = res.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  },
  methods: {
    async addTask() {
  if (!this.newTask.trim()) return;

  try {
    // Step 1: Get priority from AI
    const aiRes = await api.post('/ai/priority', { text: this.newTask });
    const priority = aiRes.data.priority;

    // Step 2: Save task with priority to DB
    const res = await api.post('/tasks', {
      title: this.newTask,
      priority: priority, // Send it to backend
    });

    this.tasks.unshift(res.data);
    this.newTask = '';
    this.$refs.taskInput.focus();
  } catch (error) {
    console.error('Error adding task with priority:', error);
  }
},

    async toggleTask(task) {
      task.completed = !task.completed;
      try {
        const updatedTask = await api.put(`/tasks/${task._id}`, { completed: task.completed });
        // Update the task list with the updated task
        this.tasks = this.tasks.map(t => t._id === task._id ? updatedTask.data : t);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },
    async deleteTask(id) {
      try {
        await api.delete(`/tasks/${id}`);
        this.tasks = this.tasks.filter(t => t._id !== id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
  },
  computed: {
    sortedTasks() {
      return this.tasks.sort((a, b) => a.completed - b.completed); // Sort completed tasks to the bottom
    }
  },
};
</script>

<style scoped>
.task-list {
  max-width: 400px;
  margin: auto;
}

.input-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

input {
  width: 80%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
}

label {
  flex: 1;
  display: flex;
  align-items: center;
}

span {
  margin-left: 8px;
}

button {
  background: red;
  color: white;
  border: none;
  cursor: pointer;
}

.priority-badge {
  padding: 2px 6px;
  margin-left: 10px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
}

.priority-badge.high {
  background-color: #e74c3c; /* Red */
}

.priority-badge.medium {
  background-color: #f39c12; /* Orange */
}

.priority-badge.low {
  background-color: #27ae60; /* Green */
}

</style>
