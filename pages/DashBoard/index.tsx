import Lucro from '../Graficos/Lucro';
import Clientes from '../Graficos/Clientes';
import styles from './style.module.scss'
import Despesas from '../Graficos/Despesas';
import DataService from '../../services/firebase-config'
import List from '../ClientList';
import { useEffect, useState } from 'react';


const DashBoard = (props: any) => {

    const [valor, setValor] = useState<any>([0])
    let YoY 
    useEffect(() => {
        const getClients = async () => {
               const data = (await DataService.getAll()).docs.map(response => response.data().valor).reduce(
                (soma:number, i:number) => {
                    return soma + i
                }, 0
            )

            
                setValor(data)

        }
        getClients()
    }, [])
    
    return (
        <div className={styles.DashBoard}>
            <div className={styles.left}>
                <div className={styles.head}>
                    <h2>DashBoard Financeiro | Análise de receita</h2>
                    <div className={styles.info}>
                        <div>
                            <p>R$ {valor}</p>
                            <span>Receita</span>
                        </div>
                        <div>
                            <p>- {YoY}%</p>
                            <span>YoY%</span>
                        </div>
                        <div>
                            <p>R$ {valor}</p>
                            <span>Despesas</span>

                        </div>
                    </div>
                </div>
                <div className={styles.Lucro}>
                    <h3>Receita ao Longo do Tempo</h3>
                    <Lucro />
                </div>
                <div className={styles.g2}>
                    <div className={styles.Clientes}>
                        <h3>Top 3 Clientes ao Longo do Tempo</h3>
                        <Clientes />
                    </div>
                    <div className={styles.Despesas}>
                        <h3>Despesas</h3>
                        <Despesas />
                    </div>
                </div>
            </div>
            <div className={styles.extrato}>
                <List />
            </div>
        </div>
    )
}



export default DashBoard
