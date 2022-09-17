import { useEffect, useState } from "react"
import SearchInput from "../SearchInput"
import DataService from '../../services/firebase-config'
import styles from './style.module.scss'

const List = () => {
    const [text, setText] = useState('')
    const [list, setList] = useState<any>([])
    useEffect(() => {
        if (text) {
            async () => setList(

                (await DataService.getAll()).docs.map(p => p.data())

                )
                
                setList(list.filter( (p:any) => p.nome.includes(text) ))
        }else{
            const getClients = async () => {
                setList(

                    (await DataService.getAll()).docs.map(response => response.data())

                    )
                }
                
                getClients()
            }
    }, [text])
    return (
        < >
            <div className={styles.list}>
                <div className={styles.search}>
                    <SearchInput value={text} onChange={(search: string) => setText(search)} />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    {list.map((client: any, key: any) => {
                        return (
                            <tbody key={key}>
                                <tr>

                                    <td>{client.nome}</td>
                                    <td>{client.valor}</td>
                                    <td>{client.data}</td>

                                </tr>
                            </tbody>

                        )
                    })}
                </table>
            </div>
        </>
    )
}
export default List