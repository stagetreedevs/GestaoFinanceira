import Lucro from '../Graficos/Lucro';
import Clientes from '../Graficos/Clientes';
import styles from './style.module.scss'
import Despesas from '../Graficos/Despesas';
import List from '../ClientList';


const DashBoard = (props: any) => {

    let valor = 2000.00
    let YoY = 33
    return (
        <div className={styles.DashBoard}>
            <div className={styles.left}>
                <div className={styles.head}>
                    <h1>DashBoard Financeiro | Análise de receita</h1>
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
                            <span>MargemContribuição</span>
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
                        <h3>Top 5 Clientes ao Longo do Tempo</h3>
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
