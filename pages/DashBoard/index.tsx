import Lucro from '../Graficos/Lucro';
import Clientes from '../Graficos/Clientes';
import styles from './style.module.scss'
import Despesas from '../Graficos/Despesas';
import FinaceService from '../../services/firebase-config'
import DataService from '../../services/firebase-config'
import List from '../ClientList';
import { useEffect, useState } from 'react';


const DashBoard = (props: any) => {

    const [despesas, setDespesas] = useState<any>([0])
    const [receita, setReceita] = useState<any>([0])
    const [saldo, setSaldo] = useState<any>([0])
    useEffect(() => {
        async function getClients() {
            const data = (await DataService.getAll("clientes")).docs.map(response => response.data().valor).reduce(
                (soma: number, i: number) => {
                    return soma + i
                }, 0
            )
            const saldo = (await (DataService.getAll("receita"))).docs.map(res => res.data().saldo)

            await setSaldo(saldo)

            await setDespesas(data)

            await setReceita((await (DataService.getAll("receita"))).docs.map(res => res.data().receita))
                console.log((await DataService.getAll("clientes")).docs.map(response => response.id))
        }


        getClients()

    }, [])
    useEffect(() => {
        const newSaldo: number = saldo[0] + (receita - despesas)
        setSaldo(newSaldo)
    }, [receita])

    return (
        <div className={styles.DashBoard}>
            <div className={styles.left}>
                <div className={styles.head}>
                    <h2>DashBoard Financeiro | Análise de receita</h2>
                    <div className={styles.info}>
                        <div>
                            <p>R$ {receita}</p>
                            <span>Receita</span>
                        </div>
                        <div>
                            <p>R$ {despesas}</p>
                            <span>Despesas</span>

                        </div>
                        <div>
                            <p>R$ {saldo}</p>
                            <span>Saldo</span>

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
