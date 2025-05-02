<template>
    <div class="progress-tracker">
      <h2>📈 Progress Tracker</h2>
  
      <!-- Chart component for overall progress -->
      <LineChart :data="chartData" :options="chartOptions" />
  
      <!-- Form to add/update progress entries -->
      <form @submit.prevent="saveProgress">
        <input v-model="progressForm.title" placeholder="Title" required />
        <input v-model="progressForm.description" placeholder="Description" />
        <input
          type="number"
          v-model="progressForm.percentage"
          min="0"
          max="100"
          placeholder="Percentage"
          required
          @input="validatePercentage"
        />
        <button type="submit">{{ editingId ? 'Update' : 'Add' }}</button>
      </form>
  
      <!-- List of progress entries -->
      <div v-for="entry in progressList" :key="entry._id" class="progress-entry">
        <h3>{{ entry.title }}</h3>
        <p>{{ entry.description }}</p>
        <div class="bar">
          <div class="fill" :style="{ width: entry.percentage + '%', backgroundColor: getProgressColor(entry.percentage) }">
            {{ entry.percentage }}%
          </div>
        </div>
        <button @click="editProgress(entry)">✏️</button>
        <button @click="deleteProgress(entry._id)">🗑</button>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../api';
  import { Line } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
  } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement);
  
  export default {
    components: {
      LineChart: Line
    },
    data() {
      return {
        progressList: [],
        progressForm: { title: '', description: '', percentage: 0 },
        editingId: null,
        chartData: {
          labels: [],
          datasets: [
            {
              label: 'Progress (%)',
              data: [],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        },
        chartOptions: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      };
    },
    async mounted() {
      try {
        const res = await api.get('/progress');
        this.progressList = res.data;
        this.updateChartData();
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    },
    methods: {
      async saveProgress() {
        if (this.editingId) {
          try {
            const res = await api.put(`/progress/${this.editingId}`, this.progressForm);
            const index = this.progressList.findIndex(p => p._id === this.editingId);
            this.progressList[index] = res.data;
            this.editingId = null;
          } catch (error) {
            console.error('Error updating progress:', error);
          }
        } else {
          try {
            const res = await api.post('/progress', this.progressForm);
            this.progressList.unshift(res.data);
          } catch (error) {
            console.error('Error adding progress:', error);
          }
        }
        this.progressForm = { title: '', description: '', percentage: 0 };
        this.updateChartData();
      },
      editProgress(entry) {
        this.progressForm = { ...entry };
        this.editingId = entry._id;
      },
      async deleteProgress(id) {
        try {
          await api.delete(`/progress/${id}`);
          this.progressList = this.progressList.filter(p => p._id !== id);
          this.updateChartData();
        } catch (error) {
          console.error('Error deleting progress:', error);
        }
      },
      updateChartData() {
        this.chartData.labels = this.progressList.map(entry => entry.title);
        this.chartData.datasets[0].data = this.progressList.map(entry => entry.percentage);
      },
      validatePercentage() {
        if (this.progressForm.percentage < 0) {
          this.progressForm.percentage = 0;
        } else if (this.progressForm.percentage > 100) {
          this.progressForm.percentage = 100;
        }
      },
      getProgressColor(percentage) {
        if (percentage >= 80) return 'green';
        if (percentage >= 50) return 'yellow';
        return 'red';
      }
    },
    watch: {
      progressList: {
        deep: true,
        handler(newVal) {
          console.log('✅ Chart updated with progressList:', newVal);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .bar {
    background: #eee;
    border-radius: 4px;
    overflow: hidden;
    margin: 8px 0;
    height: 24px;
  }
  
  .fill {
    height: 100%;
    color: white;
    text-align: center;
    line-height: 24px;
    transition: width 0.3s;
  }
  
  .progress-entry {
    margin-bottom: 20px;
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
  </style>
  