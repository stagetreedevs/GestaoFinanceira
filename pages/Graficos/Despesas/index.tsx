import React, { useEffect, useState } from 'react';
import DataService from '../../../services/firebase-config'
import styles from '../../../styles/Home.module.css'
import { Chart } from 'primereact/chart';

const Despesas = () => {
    const [data, setData] = useState<any>([])

    useEffect(() => {
        async function getData() {
            const vetor = (await DataService.getAll("clientes")).docs.map(response => response.data().valor).reduce(
                (soma: number, i: number) => {
                    return soma + i
                }, 0
            )
                setData(vetor)
        }
        getData()
    }, [])
    let chartData = {
        labels: ['Operacional', 'Outros'],
        datasets: [
            {
                data: [data],
                backgroundColor: [
                    "#23F782",
                    "#222A44"
                ],
                hoverBackgroundColor: [
                    "#01D789",
                    "#222A35",
                ]
            }]
    };

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