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

                (await DataService.getAll("clientes")).docs.map(p => p.data())

            )
            console.log(list)


            setList(list.filter((p: any) => p.nome.includes(text)))
        } else {
            const getClients = async () => {
                setList(

                    (await DataService.getAll("clientes")).docs.map(response => response.data())

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
                            <td>
                                <strong>
                                Nome
                                </strong>
                                <hr />
                            </td>
                            <td>
                                <strong>
                                Valor
                                </strong>
                                <hr />
                            </td>
                            <td>
                                <strong>
                                Data
                                </strong>
                                <hr />
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((client: any, key: any) => {
                            return (
                                <tr key={key}>

                                    <td>{client.nome}</td>
                                    <td>{client.valor}</td>
                                    <td>{client.data}</td>

                                </tr>

                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default List