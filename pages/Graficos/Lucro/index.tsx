import React, { useEffect, useState } from 'react';
import DataService from '../../../services/firebase-config'
import { Chart } from 'primereact/chart';

const GraficoLucro = () => {

    const [data, setData] = useState<any>([])

    useEffect(() => {
        async function getData() {
            const vetor = (await DataService.getAll("clientes")).docs.map(response => response.data().valor).reduce(
                (soma: number, i: number) => {
                    return soma + i
                }, 0
            )
            const vetor2 = (await DataService.getAll("receita")).docs.map(response => response.data().receita)
            setData([vetor, vetor2[0]])
            

            console.log(data[1])


        }
        getData()
    }, [])

    let basicData ={
        labels: ['Lucro', 'Despesa',],
        datasets: [
            {
                label: 'Lucros e Despesas',
                backgroundColor: ['#01d789','#222A44'],
                data: [data[1], data[0]]
            }
        ]
    }

    const getLightTheme = () => {
        let basicOptions = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 1.75,
            plugins: {
                legend: {
                    display: false
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