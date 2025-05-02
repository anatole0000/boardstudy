<template>
    <div>
      <h3>🎯 Goal Progress Chart</h3>
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { Doughnut } from 'vue-chartjs'
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  
  ChartJS.register(ArcElement, Tooltip, Legend)
  
  export default {
    name: 'GoalStatusChart',
    components: { Doughnut },
    props: ['goals'],
    computed: {
      chartData() {
        const statusCount = { 'not-started': 0, 'in-progress': 0, 'completed': 0 }
        this.goals.forEach(g => statusCount[g.status]++)
        return {
          labels: ['Not Started', 'In Progress', 'Completed'],
          datasets: [{
            backgroundColor: ['#f44336', '#ff9800', '#4caf50'],
            data: [
              statusCount['not-started'],
              statusCount['in-progress'],
              statusCount['completed'],
            ],
          }],
        }
      },
      chartOptions() {
        return {
          responsive: true,
          maintainAspectRatio: false,
        }
      },
    },
  }
  </script>
  
  <style scoped>
  div {
    max-width: 300px;
    height: 300px;
    margin: 20px auto;
  }
  </style>
  