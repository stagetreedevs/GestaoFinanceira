import React, { useEffect, useState } from 'react';
import DataService from '../../../services/firebase-config'
import { Chart } from 'primereact/chart';

const Grafico = () => {
    const [data, setData] = useState<any>({
        primeiro: '',
        segundo: '',
        terceiro: ''
    })

    useEffect(() => {
        async function getData() {
            const doc =(await DataService.getAll("clientes")).docs.map(response => response.data())
            const vetor = doc.map( p => p.valor)
            const vetor2 = vetor.filter((p:any)=> p != Math.max.apply(null,vetor))
            const vetor3 = vetor2.filter((p:any)=> p != Math.max.apply(null,vetor2))
            setData({
            primeiro: [Math.max.apply(null,vetor), doc.filter( p => p.valor == Math.max.apply(null, vetor))[0].nome],
            segundo: [Math.max.apply(null,vetor2), doc.filter( p => p.valor == Math.max.apply(null, vetor2))[0].nome], 
            terceiro: [Math.max.apply(null,vetor3), doc.filter( p => p.valor == Math.max.apply(null, vetor3))[0].nome]
            })
            
            console.log(doc.filter(p => p.valor == Math.max.apply(null,vetor))[0].nome)
        }
        getData()
    }, [])
    

    let basicData = {
        labels: [data.primeiro[1] + ':', data.segundo[1] + ':', data.terceiro[1] + ':'],
        datasets: [{
            label: ' clientes ',
            backgroundColor: ['#222A44'],
            data: [data.primeiro[0], data.segundo[0], data.terceiro[0]]
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