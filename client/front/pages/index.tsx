import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useUserGetAllQuery } from '../generated'
import styles from '../styles/Home.module.css'
import Games from './games'
import GBI from './getprofile'


const Home: NextPage = () => {


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          PROJET TRANSCENDENCE
        </h1>
        
         <h1 className={styles.title}>
        <Link href="/getusers">Users list</Link>
        </h1>
        <h1 className={styles.title}>
        <Link href="/getprofile">One profile</Link>
        </h1>
        <h1 className={styles.title}>
        <Link href="/games">Games list</Link>
        </h1>
        <h1 className={styles.title}>
        <Link href="/createUser">Create new User</Link>
        </h1>
        
      </main>
    </div>
  )
}

export default Home
