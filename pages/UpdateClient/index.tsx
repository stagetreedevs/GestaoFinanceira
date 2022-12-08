import { NextPage } from 'next'
import DataService from '../../services/firebase-config'
import { FormGroup, Grid, Input, Slide, ToggleButton } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import cell from '../assets/image/phone.svg'
import fix from '../assets/image/fixed.svg'
import { InputNumber } from 'primereact/inputnumber';
import { InputMask } from 'primereact/inputmask'
import { InputText } from 'primereact/inputtext';
import Image from 'next/image';

// import './ToastDemo.css';

function UpdateClient(props: any) {
  const [open, setOpen] = useState(true);
  const [bottom, setBottom] = useState<any>(false)
  const [tel, setTel] = useState(true);

  const [form, setForm] = useState({
    nome: '',
    numero: '111111',
    valor: 1,
    data: '',
    juros: 1
  });

  function handleClose(close: boolean = false, e?: any) {

    e.preventDefault();
    if (close) {
      if (form.data && form.nome && form.numero && form.valor) {

        try {
          const res = DataService.UpClient("clientes", form, props.id);
          res(form)
          props.success()


        }
        catch (e) {
          console.log(e);
        }
      }

    }
    setOpen(false);
    props.onClose()

  };
  useEffect(() => {
    setForm(props.client)
    console.log(props.client)
  }, [])

  return (
    <>

      <Dialog
        open={open}
        onClose={() => handleClose(false, event)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        style={{position: 'absolute'}}
      >
        <DialogTitle id="alert-dialog-title" gutterBottom>
          {"Gerenciamento de Clientes"}
        </DialogTitle>
        <DialogContent>

          <FormGroup>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>

                <InputText placeholder="Nome"
                  value={form.nome}
                  disabled
                  onChange={(e: any) => setForm({
                    ...form,
                    nome: e.target.value
                  })} />

              </Grid>
              <Grid item xs={12} md={6}>
                {tel ?
                  <InputMask placeholder="Celular"
                    value={form.numero}
                    mask="(85) 99999-9999"
                    onChange={(e) => setForm({
                      ...form,
                      numero: e.target.value
                    })} />
                  :
                  <InputMask placeholder="Fixo"
                    value={form.numero}
                    mask="9999-9999"
                    onChange={(e) => setForm({
                      ...form,
                      numero: e.target.value
                    })} >

                  </InputMask>
                }
                <ToggleButton
                  value="check"
                  selected={tel}
                  style={{ borderStyle: 'none', padding: 0, marginLeft: '-2rem' }}
                  onChange={() => {
                    setTel(!tel);
                  }}
                  size='small'
                >
                  {tel ? <Image src={cell} width={25} height={25} style={{ backgroundColor: '#fff', margin: 0 }} /> : <Image src={fix} width={25} height={25} style={{ position: 'absolute' }} />}
                </ToggleButton>

              </Grid>
              <Grid item xs={12} md={6}>

                <InputNumber placeholder="Valor"
                  value={form.valor}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      valor: e?.value || 0
                    })
                    console.log(form.valor)
                  }
                  } />

              </Grid>
              <Grid item xs={12} md={6}>

                <InputMask placeholder="Dia/Mês/Ano"
                  value={form.data}
                  mask="99/99/9999"
                  onChange={(e: any) => setForm({
                    ...form,
                    data: e.target.value
                  })} />

              </Grid>
              {bottom && <Grid item xs={12} md={6}>
                <InputNumber placeholder="Juros"
                value={form.juros}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      juros: e?.value || 0
                    })
                    console.log(form)
                  }
                  }
                />
              </Grid>}
            </Grid>

          </FormGroup>
        </DialogContent>

        <DialogActions>

          <Button onClick={() =>
            handleClose(false, event)

          }>
            Cancelar
          </Button>
          <Button onClick={() =>
            setBottom(!bottom)


          }>
            juros
          </Button>
          <Button onClick={() =>

            handleClose(true, event)
          }>
            Atualizar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UpdateClient
