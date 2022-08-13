import { truncate } from 'fs'
import type { NextPage } from 'next'
import { useState } from 'react'
import { useUserGetByidQuery } from '../generated'
import styles from '../styles/Home.module.css'

const GBI: NextPage = () => {
  const [formState, setFormState] = useState({
    id: '',
    });
    const [variable, setVariable] = useState(false);

  const { data }= useUserGetByidQuery({
        variables: { 
        input: formState.id,
        }
       });

  const ele = () => {
    if (data)
    {
      setVariable(true)
    }
    else{
      setVariable(false)
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <form onSubmit={ e => {
        e.preventDefault();
      
        }}>
        <fieldset>
        <div className="pure-control-group">
        <label>User id </label>
        <input
        value={formState.id}
        onChange={ (e) =>
        setFormState({
        ...formState,
        id: e.target.value
        })
        }
        type="text"
        placeholder="Enter an id"
        />
        </div>
        <button type="submit" onClick={ ele }> Get User</button>
        </fieldset>
        </form>

        <div> {variable && data ? <div>        
        <p>Avatar: {data?.userGetById.avatar}</p>
        <p>id; {data?.userGetById.id}</p>
        <p>Name: {data?.userGetById.name}</p>
        <p>Email: {data?.userGetById.email}</p>
        <p>Last score: {data?.userGetById.lastScore}</p>
        <p>Best score: {data?.userGetById.bestScore}</p>
        <p>Nbr of games: {data?.userGetById.games?.length}</p>  
        </div> : <div></div>}
        
        </div> 
      </main>
    </div>
  )
}

export default GBI
