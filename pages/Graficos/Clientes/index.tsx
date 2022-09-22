import React, { useEffect, useState } from 'react';
import DataService from '../../../services/firebase-config'
import { Chart } from 'primereact/chart';

const Grafico = () => {
    const [data, setData] = useState<any>([])

    useEffect(() => {
        async function getData() {
            const vetor = (await DataService.getAll("clientes")).docs.map(response => response.data().valor)
            const vetor2 = vetor.filter((p:any)=> p != Math.max.apply(null,vetor))
            const vetor3 = vetor2.filter((p:any)=> p != Math.max.apply(null,vetor2))
            setData([Math.max.apply(null,vetor), Math.max.apply(null,vetor2), Math.max.apply(null,vetor3)])
            
            console.log(data)

        }
        getData()
    }, [])
    

    let basicData = {
        labels: ['#1', '#2', '#3'],
        datasets: [{
            label: '',
            backgroundColor: ['#01d789', '#222A44', '#010326'],
            data: [data[0], data[1], data[2]]
        }]
    };

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
        <div onClick={() => console.log(data)}>
            <Chart type="bar" data={basicData} options={basicOptions} style={{ height: '20vh' }} />
        </div>
    )
}

export default Grafico