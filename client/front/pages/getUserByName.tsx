import type { NextPage } from 'next'
import { useState } from 'react'
import {  useUserGetByNameQuery } from '../generated'
import styles from '../styles/Home.module.css'

const GetUserByName: NextPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    });
    const [variable, setVariable] = useState(false);

  const { data }= useUserGetByNameQuery({
        variables: { 
        input: formState.name,
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
        value={formState.name}
        onChange={ (e) =>
        setFormState({
        ...formState,
        name: e.target.value
        })
        }
        type="text"
        placeholder="Enter a name"
        />
        </div>
        <button type="submit" onClick={ ele }> Get User</button>
        </fieldset>
        </form>

        <div> {variable && data ? <div>        
        <p>Avatar: {data?.userGetByName.avatar}</p>
        <p>id; {data?.userGetByName.id}</p>
        <p>Name: {data?.userGetByName.name}</p>
        <p>Email: {data?.userGetByName.email}</p>
        <p>Last score: {data?.userGetByName.lastScore}</p>
        <p>Best score: {data?.userGetByName.bestScore}</p>
        <p>Nbr of games: {data?.userGetByName.games?.length}</p>  
        </div> : <div></div>}
        
        </div> 
      </main>
    </div>
  )
}

export default GetUserByName
