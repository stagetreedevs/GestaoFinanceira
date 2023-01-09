
import { Sidebar } from 'primereact/sidebar';
import Image from 'next/image'
import styles from './style.module.scss'
import menu from '../assets/image/menu.svg'
import user from '../assets/image/manageUser.svg'
import addClient from '../assets/image/updateUser.svg'
import remove from '../assets/image/remove.svg'
import manage from '../assets/image/manage.png'
import dash from '../assets/image/dashboard.svg'
import update from '../assets/image/addClient.svg'
import { useState } from 'react'
import React from 'react'
import AddClient from '../AddClient'
import Link from 'next/link';
import Registro from '../../components/Registro';
import Atualizar from '../../components/Atualizar';



const Header = (props: any) => {

    const [visible, setVisible] = useState(false)
    
    const [handleRegistro, SetRegistro] = useState(false)
    const [handleAtualizar, SetAtualizar] = useState(false)
    const [handleClickDel, SetHandleClickDel] = useState(false)


    return (
        <>
            <div className={styles.header}>

                <Link href='/'>

                    <Image src={dash} width={35} height={35} />

                </Link>
                <Link href='/Financeiro'>

                    <Image src={manage} width={35} height={35} />

                </Link>
                <div onClick={(e) => setVisible(true)}>

                    <Image src={user} width={35} height={35} />

                </div>

            </div>
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <div className={styles.sideBar}>

                    <div
                        onClick={() => {
                            SetRegistro(true)
                            setVisible(false)
                        }}
                        className={styles.button}
                    >

                        <strong>Adicionar</strong>
                        <div>
                            <Image src={addClient} width={50} height={50} />
                        </div>

                    </div>
                    <div
                        onClick={() => {
                            SetHandleClickDel(true)
                            setVisible(false)
                        }}
                        className={styles.button}
                    >

                        <strong>Deletar</strong>
                        <div>
                            <Image src={remove} width={50} height={50} />
                        </div>

                    </div>
                    <div
                        onClick={() => {
                            SetAtualizar(true)
                            setVisible(false)
                        }}
                        className={styles.button}
                    >

                        <strong>Atualizar</strong>
                        <div>
                            <Image src={update} width={50} height={50} />
                        </div>

                    </div>
                </div>
            </Sidebar>
            
            {handleRegistro ? <Registro onClose={() => { SetRegistro(false) }} /> : null}
            {handleAtualizar ? <Atualizar onClose={() => { SetAtualizar(false) }} /> : null}
        </>
    )
}

export default Header
