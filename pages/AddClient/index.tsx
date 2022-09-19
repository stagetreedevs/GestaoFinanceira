import { NextPage } from 'next'
import DataService from '../../services/firebase-config'
import { FormGroup, Grid, Input, Slide } from '@mui/material';
import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DashBoard from '../DashBoard';
import { InputMask } from 'primereact/inputMask';
import styles from './style.module.scss'
import { TransitionProps } from '@mui/material/transitions';



function AddClient(props: any, onClose = () => { }) {
  const [open, setOpen] = useState(true);

  const [form, setForm] = useState({
    nome: '',
    numero: '',
    valor: '',
    data: ''
  });

  function handleClose(close: boolean = false, e?: any) {

    e.preventDefault();
    console.log(e)
    if (close) {
      try {
        DataService.add(form);
        setForm({
          nome: '',
          numero: '',
          valor: '',
          data: ''
        })

      } catch (e) {
        console.log(e);
      }

    }
    setOpen(false);
    props.onClose()

  };

  function handleClickOpen() {
    setOpen(true);
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
          {"Formulario de cliente"}
        </DialogTitle>
        <DialogContent>

          <FormGroup>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Input
                  onChange={(e: any) => setForm({
                    ...form,
                    nome: e.target.value
                  })} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input placeholder='Numero'
                  type='number'
                  onChange={(e) => setForm({
                    ...form,
                    numero: e.target.value
                  })} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input placeholder='Valor'
                  onChange={(e) => setForm({
                    ...form,
                    valor: e.target.value
                  })} />


              </Grid>
              <Grid item xs={12} md={6}>
                <InputMask placeholder="Dia/Mês/Ano"  mask="99/99/9999" value={form.data} 
                  onChange={(e: any) => setForm({
                    ...form,
                    data: e.target.value
                  })} />
              </Grid>
            </Grid>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handleClose(false, event)
          }
          }>
            Disagree
          </Button>
          <Button onClick={() => handleClose(true, event)}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddClient
