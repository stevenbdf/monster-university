import React from 'react'
import { Doughnut, Pie } from 'react-chartjs-2'

export const DoughnutChart = ({ labels, data }) => {
    return (
        <Doughnut
            data={{
                labels: labels,
                datasets: [{
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                    data: data,
                }]
            }}
        />
    )
}

export const PieChart = ({ labels, data }) => {
    return (
        <Pie
            data={{
                labels: labels,
                datasets: [{
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: [
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1,
                    data: data,
                }]
            }}
        />
    )
}