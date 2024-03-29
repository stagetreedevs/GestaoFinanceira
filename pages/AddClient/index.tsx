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
import { Sidebar } from 'primereact/sidebar';
import { async } from '@firebase/util';

// import './ToastDemo.css';

function AddClient(props: any) {
  const [open, setOpen] = useState(true);
  const [tel, setTel] = useState(true);
  const [juros, setJuros] = useState<any>()
  const [bottom, setBottom] = useState<any>(false)

  const [form, setForm] = useState({
    nome: '',
    numero: '',
    valor: 1,
    data: '',
    juros: 1
  });

  useEffect(() => {
    DataService.getData('porcentagem', 'juros').then(data => setForm({
      ...form,
      juros: data.data()?.juros
    }))

  }, [])


  function handleClose(close: boolean = false, e?: any) {
    e.preventDefault();
    console.log(e)
    if (close) {
      if (form.data && form.nome && form.numero && form.valor) {

        try {
          DataService.add(form, "clientes");
          setForm({
            nome: '',
            numero: '',
            valor: 1,
            data: '',
            juros: juros
          })
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

  return (
    <>

      <Dialog
        open={open}
        onClose={() => handleClose(false, event)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title" gutterBottom>
          {"Gerenciamento de Clientes"}
        </DialogTitle>
        <DialogContent>

          <FormGroup>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>

                <InputText placeholder="Nome"
                  onChange={(e: any) => setForm({
                    ...form,
                    nome: e.target.value
                  })} />

              </Grid>
              <Grid item xs={12} md={6}>
                {tel ?
                  <InputMask placeholder="Celular"
                    mask="(85) 99999-9999"
                    onChange={(e) => setForm({
                      ...form,
                      numero: e.target.value
                    })} />
                  :
                  <InputMask placeholder="Fixo"
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
                  mask="99/99/9999"
                  onChange={(e: any) => setForm({
                    ...form,
                    data: e.target.value
                  })} />

              </Grid>

              {bottom && <Grid item xs={12} md={6}>
                <InputNumber placeholder="Juros"
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
            Concluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddClient
