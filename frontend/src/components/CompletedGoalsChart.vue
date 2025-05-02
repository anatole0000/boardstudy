<template>
    <Line :data="chartData" :options="chartOptions" />
  </template>
  
  <script>
  import { Line } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale
  } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)
  
  export default {
    name: 'CompletedGoalsChart',
    components: { Line },
    props: ['goals'],
    computed: {
      chartData() {
        const data = this.goals
          .filter(g => g.status === 'completed')
          .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
  
        return {
          labels: data.map(g => new Date(g.deadline).toLocaleDateString()),
          datasets: [{
            label: 'Completed Goals Over Time',
            data: data.map((_, i) => i + 1),  // Increase the count for each goal
            borderColor: '#42A5F5',
            tension: 0.3,
            fill: false
          }]
        }
      },
      chartOptions() {
        return {
          responsive: true,
          plugins: {
            legend: {
              display: true
            }
          }
        }
      }
    }
  }
  </script>
  