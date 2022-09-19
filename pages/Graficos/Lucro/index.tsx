import React, { useState } from 'react';
import { Chart } from 'primereact/chart';

const GraficoLucro = () => {

    const [basicData] = useState({
        labels: ['Jan', 'Fev', 'Mar', 'Abril', 'Maio', 'Jun', 'Jul','Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
            {
                label: 'Lucros',
                backgroundColor: '#222A44',
                data: [65, 59, 80, 81, 56, 55, 40, 60, 60, 60, 60, 60]
            },
            {
                label: 'Gastos',
                backgroundColor: '#23F782',
                data: [28, 48, 40, 19, 86, 27, 90, 40, 40, 40, 40, 40]
            }
        ]
    });

    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: 1.75,
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 16
                        },
                        color: '#495057'
                    }
                }
            },
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

export default GraficoLucro