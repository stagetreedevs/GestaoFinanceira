
import { Sidebar } from 'primereact/sidebar';
import Image from 'next/image'
import styles from './style.module.scss'
import menu from '../assets/image/menu.svg'
import addClient from '../assets/image/addClient.svg'
import logo from '../assets/image/logo.webp'
import { Button, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import React from 'react'
import AddClient from '../AddClient'



const Header = (props: any) => {

    const [visible, setVisible] = useState(false)
    const [handleClickOpen, SetHandleClickOpen] = useState(false)


    return (
        <>
            <div className={styles.header}>

                <div onClick={(e) => setVisible(true)}>
                    <Image src={menu} width={40} height={40} />

                </div>

                <Image src={logo} width={100} height={100} />


                <Sidebar visible={visible} onHide={() => setVisible(false)}>
                    <Button onClick={() => {
                        SetHandleClickOpen(true)
                        setVisible(false)
                    }}>
                        <strong style={{color: 'blue', marginRight: '1rem'}}>Adicionar</strong><Image src={addClient} width={25} height={25}/>

                    </Button>
                </Sidebar>

            </div>
            {handleClickOpen ? <AddClient onClose={() => { SetHandleClickOpen(false) }} /> : null}
        </>
    )
}

export default Header
