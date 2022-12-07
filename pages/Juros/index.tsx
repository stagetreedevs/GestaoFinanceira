import DataService from '../../services/firebase-config'
import { FormGroup, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { InputNumber } from 'primereact/inputnumber';



function Juros(props: any) {
    const [open, setOpen] = useState(true);
    const [up, setUp] = useState(0)


    const [form, setForm] = useState({
        juros: 0,
    });

    function handleClose(close: boolean = false, e?: any) {
        e.preventDefault();
        if (close) {
            console.log(form.juros)
            if (form.juros > 1) {

                try {
                    DataService.update(form, "juros", 'porcentagem');
                    setForm({
                        juros: 0,
                    })
                    props.success()


                } catch (e) {
                    console.log(e);
                }

            }
        }
        setOpen(false);
        props.onClose()

    };

    useEffect(() => {
        const getJuros = async () => {
            const juros = (await (DataService.getAll("receita"))).docs.map(res => res.data().saldo)
            await setForm({

                juros: juros[0]
            })
        }
        getJuros()
    }, [])

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

                                <InputNumber placeholder="Juros"
                                    onValueChange={(e) => {
                                        setForm({
                                            juros: (e.target.value || 0)
                                        })
                                    }} />

                            </Grid>
                        </Grid>

                    </FormGroup>
                </DialogContent>

                <DialogActions>

                    <Button type='submit' onClick={() =>
                        handleClose(false, event)

                    }>
                        Cancelar
                    </Button>
                    <Button type='submit' onClick={async () => {
                        await setUp(1)

                        handleClose(true, event)
                    }}>
                        Concluir
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Juros
