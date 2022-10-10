import React, { useEffect, useRef, useState } from "react"
import Image from 'next/image'
import style from './style.module.scss'
import DataService from '../../services/firebase-config'
import VisibleOn from '../assets/image/Visible-on.svg'
import VisibleOff from '../assets/image/Visible-off.svg'
import Header from "../Header"
import addClient from '../assets/image/addClient.svg'
import update from '../assets/image/updateUser.svg'
import remove from '../assets/image/remove.svg'
import Deposit from "../Deposit"
import { Toast } from 'primereact/toast';
import Saque from "../Saque"
import AddClient from "../AddClient"
const Financeiro = () => {
  const [despesas, setDespesas] = useState<any>([0])
  const [receita, setReceita] = useState<any>([0])
  const [saldo, setSaldo] = useState<any>([0])
  const [visible, setVisible] = useState<any>(true)
  const [handleOpenDeposit, SethandleOpenDeposit] = useState(false)
  const [handleOpenSaque, SethandleOpenSaque] = useState(false)
  const [handleClickOpen, SetHandleClickOpen] = useState(false)
  const toast = useRef(null);
 
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
          <div className={style.saldo}>
            <div>
              <h2>Saldo atual: </h2>
              <h2>
                {visible ? <s> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </s> : 'R$ ' + saldo + ',00'}
              </h2>
            </div>
            <div className={style.image} onClick={() => setVisible(!visible)} >
              {visible ? <Image src={VisibleOff} width={30} height={30} /> : <Image width={30} height={30} src={VisibleOn} />}
            </div>
          </div>

          <div className={style.buttons}>
            <div className={style.button} onClick={() => SethandleOpenDeposit(true)}><h3>Deposito</h3></div>
            <div className={style.button} onClick={() => SethandleOpenSaque(true)}><h3>Saque</h3></div>
            <div className={style.button} onClick={() => alert()}><h3>Juros</h3></div>
          </div>

        </div>
        <div className={style.BottomBar}>

          <div
            onClick={() => {
              SetHandleClickOpen(true)
            }}
            className={style.buttonClient}
          >

            <strong>Novo Emprestimo</strong>
            <div>
              <Image src={addClient} width={50} height={50} />
            </div>

          </div>
          <div
            onClick={() => {
            }}
            className={style.buttonClient}
          >

            <strong>Fechar Emprestimo</strong>
            <div>
              <Image src={remove} width={50} height={50} />
            </div>

          </div>
          <div
            onClick={() => {
              showSuccess()
            }}
            className={style.buttonClient}
          >

            <strong>Atualizar Emprestimo</strong>
            <div>
              <Image src={update} width={50} height={50} />
            </div>

          </div>
        </div>
      </div>
      {handleOpenDeposit ? <Deposit onClose={() => { SethandleOpenDeposit(false) }} success={ () => showSuccess()}/> : null}
      {handleClickOpen ? <AddClient onClose={() => { SetHandleClickOpen(false) }} success={ () => showSuccess()}/> : null}
      {handleOpenSaque ? <Saque onClose={() => { SethandleOpenSaque(false) }} success={ () => showSuccess()}/> : null}
      

      <Toast ref={toast} />
    </>
  )
}

export default Financeiro