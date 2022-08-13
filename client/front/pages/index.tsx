import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          PROJET TRANSCENDENCE
        </h1>
        <h1 className={styles.title}>
        <Link href="/signUp">Sign up</Link>
        </h1>
        <h1 className={styles.title}>
        <Link href="/login">Login</Link>
        </h1>
         <h1 className={styles.title}>
        <Link href="/getUsers">Users list</Link>
        </h1>
        <h1 className={styles.title}>
        <Link href="/getprofile">User by id</Link>
        </h1>
        <h1 className={styles.title}>
        <Link href="/createUser">Create new User</Link>
        </h1>
        <h1 className={styles.title}>
        <Link href="/deleteUser">Delete User</Link>
        </h1>
        <h1 className={styles.title}>
        <Link href="/games">Games list</Link>
        </h1>
        <h1 className={styles.title}>
        <Link href="/gameById">Game by id</Link>
        </h1>
        
        
      </main>
    </div>
  )
}

export default Home
