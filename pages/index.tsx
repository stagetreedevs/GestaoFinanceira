import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import AddClient from './AddClient'
import DashBoard from './DashBoard'
import Header from './Header'
import Login from './Login'

const App: NextPage = () => {
  const [logged, setLogged] = useState<any>()
  useEffect(() => {
   const local = localStorage.getItem('logged')
    setLogged(local)
    console.log(local)
  }, [])
  
  return (
    <>{logged == 'auth' ?
      <>
        <Header />
        <div className={styles.dash}>
          <DashBoard />
        </div>
      </>
      :
      <Login log={() => setLogged('auth')} />}
    </>
  )
}

export default App
