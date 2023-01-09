import React, { useState } from 'react';
import style from './style.module.scss';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { InputText } from 'primereact/inputtext';
import Button from '@mui/material/Button';
import { auth } from '../../services/firebase';
import { useRouter } from 'next/router';
import { Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, Grid, TextField } from '@mui/material';
import { InputNumber } from 'primereact/inputnumber';


function Registro(props: any) {
    const [open, setOpen] = useState(true);
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [
        createUserWithEmailAndPassword
    ] = useCreateUserWithEmailAndPassword(auth);

    async function register(close: boolean, e: any) {
        e.preventDefault();

        if (close) {

           await createUserWithEmailAndPassword(form.username, form.password)
                .then(res => {
                    if (res?.user.email) {
                        alert('Cadastrado com sucesso')
                    }
                })
                .catch(err =>
                    alert('deu erro')
                )

        } else {            
            setOpen(false);
            props.onClose()
        }
    }

    return (
        <><Dialog
            open={open}
            onClose={() => register(false, event)}
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

                            <TextField placeholder="Email"
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        username: e.target.value
                                    });
                                }} />

                        </Grid>
                        <Grid item xs={12} md={6}>

                            <TextField placeholder="Senha"
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        password: e.target.value
                                    });
                                }} />

                        </Grid>
                    </Grid>

                </FormGroup>
            </DialogContent>

            <DialogActions>

                <Button type='submit' onClick={() => register(false, event)}>
                    Cancelar
                </Button>
                <Button type='submit' onClick={async () => {
                    register(true, event);
                }}>
                    Concluir
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default Registro;
