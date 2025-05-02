<template>
    <div class="chart-container">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { Line } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale
  } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale)
  
  export default {
    name: 'TaskProgressChart',
    components: { Line },
    props: ['tasks'],
    computed: {
      chartData() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(task => task.completed).length;
        const remainingTasks = totalTasks - completedTasks;
        
        return {
          labels: ['Completed', 'Remaining'],
          datasets: [{
            label: 'Task Progress',
            data: [completedTasks, remainingTasks],
            backgroundColor: ['#42A5F5', '#FF7043'],
            borderColor: ['#42A5F5', '#FF7043'],
            borderWidth: 1,
          }]
        }
      },
      chartOptions() {
        return {
          responsive: true,
          plugins: {
            legend: {
              display: true
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            }
          }
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .chart-container {
    margin: 20px 0;
    max-width: 400px;
    margin: auto;
  }
  </style>
  