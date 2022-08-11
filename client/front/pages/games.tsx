import type { NextPage } from 'next'
import { useGameListQuery } from '../generated'
import styles from '../styles/Home.module.css'


const Games: NextPage = () => {
  const { data, error, loading } = useGameListQuery();

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

        {!data
          ? null
          : data.gameList.map((e) => {
              return <p key={e.id}> ** {e.id} ** {e.createdAt} ** {e.updatedAt} ** {e.score} ** {e.win} ** {e.loss} PLAYER DETAILS == {e.player?.id} ** {e.player?.name}</p>;
            })
        }
        </main>
    </div>
  )
}

export default Games