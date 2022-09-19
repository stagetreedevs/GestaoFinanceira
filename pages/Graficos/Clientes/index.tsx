import React, { useState } from 'react';
import { Chart } from 'primereact/chart';

const Grafico = () => {

    const [basicData] = useState({
        labels: ['#1', '#2', '#3', '#4', '#5'],
        datasets: [{
            label: '',
            backgroundColor: '#222A44',
            data: [65, 59, 80, 81, 56]
        }]
    });

    const getLightTheme = () => {
        let basicOptions = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 1.5,
            scales: {
                x: {
                    ticks: {
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 16
                        },
                        color: '#495057'
                    },
                    grid: {
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 16
                        },
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 16
                        },
                        color: '#495057'
                    },
                    grid: {
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 16
                        },
                        color: '#ebedef'
                    }
                }
            }
        };
        return { basicOptions }
    }

    const { basicOptions } = getLightTheme();

    return (
        <div>
            <Chart type="bar" data={basicData} options={basicOptions} />
        </div>
    )
}

export default Grafico