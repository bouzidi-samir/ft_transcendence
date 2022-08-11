import { ID } from '@nestjs/graphql'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { stringify } from 'querystring'
import { useUserGetByidQuery } from '../generated'
import styles from '../styles/Home.module.css'

const GBI: NextPage = () => {
  const { data, error, loading } = useUserGetByidQuery({
         variables: { 
          input: "6984552e-f817-4edc-a1f8-90315692721f",
         },
       });

  if (loading)
  return (
    <main className={styles.main}>
        Loading...
    </main>
    );

    if (error)
    return (
      <main className={styles.main}>
          {error.message}
      </main>
      );

  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <Image src={'https://images.unsplash.com/photo-1583274082351-893b3d0100d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGVsbGJveXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'} width="100px" height={"100px"}/>
        <p>{data?.userGetById.name}</p>
        <p>{data?.userGetById.id}</p>
        <p>{data?.userGetById.email}</p>
        <p>{data?.userGetById.lastScore}</p>
        <p>{data?.userGetById.bestScore}</p>
        <p>{data?.userGetById.games?.length}</p>
      </main>
    </div>
  )
}

export default GBI
