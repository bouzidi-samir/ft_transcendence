import type { NextPage } from 'next'
import Image from 'next/image'
import { useUserGetAllQuery } from '../generated'
import styles from '../styles/Home.module.css'



const Online: NextPage = () => {
  
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
        {/* <h1>Actual number of users: {data?.userGetAll.length}</h1> */}
        {!data
          ? null
          : data.userGetAll.map((e) => {
              return <p key={e.id}>{e.name} ------- Online status = {e.online.toString()}
               </p>;
            })
        }
      </main>
    </div>
  )
}

export default Online
function StringValueOf(online: boolean): import("react").ReactNode {
    throw new Error('Function not implemented.')
}

