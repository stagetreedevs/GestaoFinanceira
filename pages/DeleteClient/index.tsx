import { NextPage } from 'next'
import DataService from '../../services/firebase-config'
import { FormGroup, Grid, Input, Slide, ToggleButton, Typography } from '@mui/material';
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
  const [tel, setTel] = useState(true);

  const [form, setForm] = useState({
    nome: '',
    numero: '111111',
    valor: 1,
    data: ''
  });

  function handleClose(close: boolean = false, e?: any) {

    e.preventDefault();
    if (close) {
      if (form.data && form.nome && form.numero && form.valor) {

        try {
          const res = DataService.delClient("clientes", form, props.id);
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
        style={{ position: 'absolute' }}
      >
        <DialogTitle id="alert-dialog-title" gutterBottom>
          {"Gerenciamento de Clientes"}
        </DialogTitle>
        <DialogContent>
          <Typography variant="h5" component="h6">
            Quem mesmo deletar o/a Cliente {form.nome}?
          </Typography>
        </DialogContent>

        <DialogActions>

          <Button onClick={() =>
            handleClose(false, event)
          }>
            Cancelar
          </Button>
          <Button onClick={() =>
            handleClose(true, event)
          }>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UpdateClient
