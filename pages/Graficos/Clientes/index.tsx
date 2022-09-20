import React, { useState } from 'react';
import { Chart } from 'primereact/chart';

const Grafico = () => {

    const [basicData] = useState({
        labels: ['#1', '#2', '#3'],
        datasets: [{
            label: '',
            backgroundColor: '#222A44',
            data: [65, 59, 80]
        }]
    });

    const getLightTheme = () => {
        let basicOptions = {
            indexAxis: 'y',
            reponsive: false,
            maintainAspectRatio: false,
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
        <div style={{}}>
            <Chart type="bar" data={basicData} options={basicOptions} style={{height: '20vh'}} />
        </div>
    )
}

export default Grafico