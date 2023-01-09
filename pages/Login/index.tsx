import React, { useState } from 'react';
import style from './style.module.scss';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { auth } from '../../services/firebase';
import { useRouter } from 'next/router';


function Login(props:any) {
    const [type, setType] = useState('password');
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [
        createUserWithEmailAndPassword
    ] = useCreateUserWithEmailAndPassword(auth);
    const [
        signInWithEmailAndPassword
      ] = useSignInWithEmailAndPassword(auth);
    const router = useRouter()

    async function register(username: string, password: string) {
            signInWithEmailAndPassword(username, password)
            .then(res => {
                if (res?.user.email) {
                    props.log()
                    localStorage.setItem('logged', 'auth')
                }
            })
            .catch( err =>
                alert('deu erro')
            )
          
    }

    return (
        <div className={style.Login}>
            <div className={style.content}>
                <p>Login</p>
                <div className={style.inputs}>
                    <input type="text" placeholder='usuário' onChange={(e) => {
                        setForm({
                            ...form,
                            username: e.target.value
                        })
                    }} />
                    <input type={type} placeholder='senha' onChange={(e) => {
                        setForm({
                            ...form,
                            password: e.target.value
                        })
                    }} />
                </div>
                <Button label="Entrar" aria-label="Submit" onClick={() => {
                    register(form.username, form.password)
                }} />
            </div>
        </div>
    );
}

export default Login;
