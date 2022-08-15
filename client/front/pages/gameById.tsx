import type { NextPage } from 'next'
import { useState } from 'react'
import { useGameByIdQuery } from '../generated'
import styles from '../styles/Home.module.css'

const GameById: NextPage = () => {
  const [formState, setFormState] = useState({
    id: '',
    });

  const [variable, setVariable] = useState(false); 

  const { data }= useGameByIdQuery({
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
        <label>Game id </label>
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
        <button type="submit"  onClick={ ele }> Get game by id </button>
        </fieldset>
        </form>

        {/* <div> { variable && data ? <div>  */}
        <p>Id:  {data?.gameById.id}</p>
        <p>Created at:  {data?.gameById.createdAt}</p>
        <p>Updated at:  {data?.gameById.updatedAt}</p>
        <p>Score:  {data?.gameById.score}</p>
        <p>Win:  {data?.gameById.win.toString()}</p>
        <p>Loss:  {data?.gameById.loss.toString()}</p>
        <p>Player id:  {data?.gameById.player?.id}</p>
        <p>Player name:  {data?.gameById.player?.name}</p>
        {/* </div> : <div>lala</div>} */}
        
      </main>
    </div>
  )
}

export default GameById
