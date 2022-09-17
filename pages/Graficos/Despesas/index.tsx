import React, { useState } from 'react';
import { Chart } from 'primereact/chart';

const Despesas = () => {
    const [chartData] = useState({
        labels: ['Operacional', 'Outros'],
        datasets: [
            {
                data: [300, 50, ],
                backgroundColor: [
                    "#f06e7c",
                    "#310f61"
                ],
                hoverBackgroundColor: [
                    "#ff3c4f",
                    "#310f61"
                ]
            }]
    });

    const [lightOptions] = useState({
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    });

    return (
        <div>
            <Chart type="doughnut" data={chartData} options={lightOptions} style={{ position: 'relative', width: '12.5vw' }} />
        </div>
    )
}

export default Despesas