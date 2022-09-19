
import { Sidebar } from 'primereact/sidebar';
import Image from 'next/image'
import styles from './style.module.scss'
import menu from '../assets/image/menu.svg'
import user from '../assets/image/manageUser.svg'
import update from '../assets/image/updateUser.svg'
import remove from '../assets/image/remove.svg'
import manage from '../assets/image/manage.png'
import dash from '../assets/image/dashboard.svg'
import addClient from '../assets/image/addClient.svg'
import { Button, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import React from 'react'
import AddClient from '../AddClient'
import link from 'next/link';
import Link from 'next/link';



const Header = (props: any) => {

    const [visible, setVisible] = useState(false)
    const [handleClickOpen, SetHandleClickOpen] = useState(false)


    return (
        <>
            <div className={styles.header}>

                <Link href='/'>

                    <Image src={dash} width={35} height={35} />

                </Link>
                <Link href='/'>

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
                            SetHandleClickOpen(true)
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
                            SetHandleClickOpen(true)
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
                            SetHandleClickOpen(true)
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
            {handleClickOpen ? <AddClient onClose={() => { SetHandleClickOpen(false) }} /> : null}
        </>
    )
}

export default Header
