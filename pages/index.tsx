import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import AddClient from './AddClient'
import DashBoard from './DashBoard'
import Header from './Header'

const App: NextPage = () => {
  return (
    <>
      <Header />
      <div className={styles.dash}>
        <DashBoard />
      </div>
    </>
  )
}

export default App
