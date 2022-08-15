import type { NextPage } from 'next'
import Image from 'next/image'
import { useUserGetAllQuery } from '../generated'
import styles from '../styles/Home.module.css'



const Home: NextPage = () => {
  
  // const { data, error, loading } = useQuery<UserGetAllQuery, UserGetAllQueryVariables>(UserGetAllDocument); 
  const { data, error, loading } = useUserGetAllQuery();

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
        <h1>Actual number of users: {data?.userGetAll.length}</h1>
        {!data
          ? null
          : data.userGetAll.map((e) => {
              return <p key={e.id}> <Image src={'https://images.unsplash.com/photo-1570158268183-d296b2892211?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'} alt={e.name} width="100px" height={"100px"}/>   
              ** ID= {e.id} ** Name= {e.name} ** Created At= {e.createdAt} ** {e.updatedAt} ** Email= {e.email} ** Lastscore= {e.lastScore} ** Bestcore= {e.bestScore} ** games= {e.games} ** Online= {e.online}</p>;
              // return <p key={e.id}>{e.id} ** < Image src={'e.avatar'} width="100px" height="100px" /> ** {e.name} ** {e.createdAt} ** {e.updatedAt} ** {e.email} ** {e.lastScore} ** {e.bestScore}</p>;
            })
        }
      </main>
    </div>
  )
}

export default Home
