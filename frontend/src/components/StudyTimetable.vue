<template>
    <div class="timetable">
      <h2>📅 Study Timetable</h2>
  
      <form @submit.prevent="saveEntry">
        <div>
          <label for="subject">Subject</label>
          <input v-model="entry.subject" id="subject" placeholder="Subject" required />
        </div>
        <div>
          <label for="day">Day</label>
          <select v-model="entry.day" id="day" required>
            <option disabled value="">Select Day</option>
            <option v-for="day in days" :key="day">{{ day }}</option>
          </select>
        </div>
        <div>
          <label for="startTime">Start Time</label>
          <input type="time" v-model="entry.startTime" id="startTime" required />
        </div>
        <div>
          <label for="endTime">End Time</label>
          <input type="time" v-model="entry.endTime" id="endTime" required />
        </div>
        <div>
          <label for="notes">Optional Notes</label>
          <input v-model="entry.notes" id="notes" placeholder="Optional notes" />
        </div>
        <button type="submit">{{ editingId ? 'Update Entry' : 'Add Entry' }}</button>
      </form>
  
      <!-- Display chart if there are entries -->
      <div v-if="entries.length > 0">
        <StudyTimeChart :data="chartData" :options="chartOptions" />
      </div>
      <div v-else>
        <p>No study time entries available for display.</p>
      </div>
  
      <div v-for="day in days" :key="day" class="day-block">
        <h3>{{ day }}</h3>
        <div v-for="entry in entriesByDay(day)" :key="entry._id" class="entry-card">
          <strong>{{ entry.subject }}</strong> ({{ entry.startTime }} - {{ entry.endTime }})
          <div v-if="entry.notes">{{ entry.notes }}</div>
          <button @click="editEntry(entry)">✏️ Edit</button>
          <button @click="deleteEntry(entry._id)">🗑 Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../api';
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  
  // Register chart components
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  export default {
    components: { StudyTimeChart: Bar },
    data() {
      return {
        entries: [],
        entry: {
          subject: '',
          day: '',
          startTime: '',
          endTime: '',
          notes: ''
        },
        editingId: null,
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      };
    },
    async mounted() {
      try {
        const res = await api.get('/timetable');
        this.entries = res.data;
      } catch (error) {
        console.error("Error loading timetable entries:", error);
      }
    },
    methods: {
      async saveEntry() {
        try {
          if (this.editingId) {
            const res = await api.put(`/timetable/${this.editingId}`, this.entry);
            const index = this.entries.findIndex(e => e._id === this.editingId);
            this.entries[index] = res.data;
            this.editingId = null;
          } else {
            const res = await api.post('/timetable', this.entry);
            this.entries.push(res.data);
          }
          this.resetForm();
        } catch (error) {
          console.error("Error saving timetable entry:", error);
        }
      },
      editEntry(entry) {
        this.entry = { ...entry };
        this.editingId = entry._id;
      },
      async deleteEntry(id) {
        try {
          await api.delete(`/timetable/${id}`);
          this.entries = this.entries.filter(e => e._id !== id);
        } catch (error) {
          console.error("Error deleting timetable entry:", error);
        }
      },
      resetForm() {
        this.entry = { subject: '', day: '', startTime: '', endTime: '', notes: '' };
        this.editingId = null;
      },
      entriesByDay(day) {
        return this.entries.filter(e => e.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime));
      },
      // Calculate total study hours for each day
      getStudyHoursForDay(day) {
        const entriesForDay = this.entriesByDay(day);
        return entriesForDay.reduce((total, entry) => {
          const startTime = new Date(`1970-01-01T${entry.startTime}:00Z`);
          const endTime = new Date(`1970-01-01T${entry.endTime}:00Z`);
          const duration = (endTime - startTime) / (1000 * 60 * 60); // in hours
          return total + duration;
        }, 0);
      }
    },
    computed: {
      chartData() {
        const daysOfWeek = this.days;
        const studyTimes = daysOfWeek.map(day => this.getStudyHoursForDay(day));
  
        return {
          labels: daysOfWeek,
          datasets: [
            {
              label: 'Study Time (hours)',
              data: studyTimes,
              backgroundColor: '#4caf50',
              borderColor: '#388e3c',
              borderWidth: 1
            }
          ]
        };
      },
      chartOptions() {
        return {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        };
      }
    }
  };
  </script>
  
  <style scoped>
  .timetable {
    padding: 1rem;
  }
  
  form {
    margin-bottom: 1.5rem;
  }
  
  form div {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.3rem;
  }
  
  input, select {
    width: 100%;
    padding: 0.5rem;
    margin: 0.3rem 0;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #4caf50;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #388e3c;
  }
  
  .day-block {
    margin-bottom: 2rem;
  }
  
  .entry-card {
    background: #f9f9f9;
    padding: 0.5rem;
    margin: 0.3rem 0;
    border-radius: 5px;
  }
  
  button {
    margin-left: 0.5rem;
  }
  </style>
  