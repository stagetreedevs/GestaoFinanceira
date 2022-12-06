import React, { useEffect, useRef, useState } from "react"
import Image from 'next/image'
import style from './style.module.scss'
import DataService from '../../services/firebase-config'
import VisibleOn from '../assets/image/Visible-on.svg'
import VisibleOff from '../assets/image/Visible-off.svg'
import Header from "../Header"
import update from '../assets/image/addClient.png'
import addClient from '../assets/image/Money.svg'
import remove from '../assets/image/MoneyOff.svg'
import Deposit from "../Deposit"
import { Toast } from 'primereact/toast';
import Saque from "../Saque"
import AddClient from "../AddClient"
import { Sidebar } from "primereact/sidebar"
import List from "../ClientList"
import DelList from "../DelList"
import { Accordion, AccordionTab } from 'primereact/accordion';
const Financeiro = () => {
  const [despesas, setDespesas] = useState<any>([0])
  const [receita, setReceita] = useState<any>([0])
  const [saldo, setSaldo] = useState<any>([0])
  const [visible, setVisible] = useState<any>(true)
  const [bottom, setBottom] = useState<any>(false)
  const [handleOpenDeposit, SethandleOpenDeposit] = useState(false)
  const [handleOpenSaque, SethandleOpenSaque] = useState(false)
  const [handleClickOpen, SetHandleClickOpen] = useState(false)
  const [handle, SetHandle] = useState(false)
  const toast = useRef<any>(null);

  useEffect(() => {


    async function getClients() {
      const data = (await DataService.getAll("clientes")).docs.map(response => response.data().valor).reduce(
        (soma: number, i: number) => {
          return soma + i
        }, 0
      )
      const saldo = (await (DataService.getAll("receita"))).docs.map(res => res.data().saldo)
      const juros = (await (DataService.getAll("juros"))).docs.map(res => res.data())[0]

      await setSaldo(saldo)

      await setDespesas(data)

      await setReceita((await (DataService.getAll("receita"))).docs.map(res => res.data().receita))
    }

    getClients()

  }, [])
  const showSuccess = () => {

    toast.current?.show({ severity: 'success', summary: 'Success', detail: '', life: 3000 });
  }
  useEffect(() => {
    const newSaldo: number = saldo[0] + (receita - despesas)
    setSaldo(newSaldo)
  }, [receita])
  return (
    <>
      <Header />
      <div className={style.dash}>
        <div className={style.head}>

          <div onClick={() => setVisible(!visible)} >
            {!visible ? <>
              <div className={style.saldo}>
                <p>Saldo atual:
                  {' R$ ' + saldo + ',00'}
                </p>
                <Image src={VisibleOff} width={30} height={30} />
              </div>
            </> : <>
              <Image width={30} height={30} src={VisibleOn} />
            </>}
          </div>

        </div>


        <div className={style.ButtonGroup}>

          <div
            onClick={() => {
              SetHandleClickOpen(true)
            }}
            className={style.buttonClient}
          >

            <div className={style.image}>
              <Image src={addClient} width={50} height={50} />
            </div>
            <div className={style.content}>
            <strong>Novo Emprestimo</strong>
            </div>
          </div>

          <div
            onClick={() => {
              setBottom(true)
              SetHandle(true)
            }}
            className={style.buttonClient}
          >

            <div className={style.image}>
              <Image src={remove} width={50} height={50} />
            </div>
            <div className={style.content}>
            <strong>Fechar Emprestimo</strong>
            </div>
          </div>
          <div
            onClick={() => {
              setBottom(true)
              SetHandle(false)
            }}
            className={style.buttonClient}
          >

            <div className={style.image}>
              <Image src={update} width={50} height={50} />
            </div>
            <div className={style.content}>
            <strong>Atualizar Emprestimo</strong>
            </div>

          </div>
        </div>
        <div className={style.ButtonGroup}>

          <div
            onClick={() => SethandleOpenSaque(true)}
            className={style.buttonClient}
          >
            <div className={style.image}>
              <Image src={addClient} width={50} height={50} />
            </div>
            <div className={style.content}>
            <strong>Saque</strong>
            </div>
          </div>

          <div
           onClick={() => alert()}
            className={style.buttonClient}
          >
            <div className={style.image}>
              <Image src={addClient} width={50} height={50} />
            </div>
            <div className={style.content}>
            <strong>Juros</strong>
            </div>
          </div>
          <div
            onClick={() => SethandleOpenDeposit(true)}
            className={style.buttonClient}
          >

            <div className={style.image}>
              <Image src={addClient} width={50} height={50} />
            </div>
            <div className={style.content}>
            <strong>Deposito</strong>
            </div>
          </div>
        </div>
      </div>
      {handleOpenDeposit ? <Deposit onClose={() => { SethandleOpenDeposit(false) }} success={() => showSuccess()} /> : null}
      {handleClickOpen ? <AddClient onClose={() => { SetHandleClickOpen(false) }} success={() => showSuccess()} /> : null}
      {handleOpenSaque ? <Saque onClose={() => { SethandleOpenSaque(false) }} success={() => showSuccess()} /> : null}
      <Sidebar visible={bottom} position="bottom" onHide={() => setBottom(false)} className={style.extrato} style={{ height: '75%' }}>
        <div className={style.list}>
          <h1>Selecione o Cliente</h1>
          {handle ?
            <DelList onClose={() => { setBottom(false) }} /> :
            <List onClose={() => { setBottom(false) }} />
          }
        </div>
      </Sidebar>

      <Toast ref={toast} />
    </>
  )
}

export default Financeiro