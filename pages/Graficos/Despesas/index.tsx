import React, { useState } from 'react';
import styles from '../../../styles/Home.module.css'
import { Chart } from 'primereact/chart';

const Despesas = () => {
    const [chartData] = useState({
        labels: ['Operacional', 'Outros'],
        datasets: [
            {
                data: [300, 50, ],
                backgroundColor: [
                    "#23F782",
                    "#222A44"
                ],
                hoverBackgroundColor: [
                    "#01D789",
                    "#222A35",
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
            <Chart type="doughnut" data={chartData} options={lightOptions} className={styles.chart} />
    )
}

export default Despesas