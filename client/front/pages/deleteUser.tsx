import type { NextPage } from 'next'
import { useState } from 'react';
import { useDeleteuserMutation } from '../generated';
import styles from '../styles/Home.module.css'
import router, { useRouter } from 'next/router';




const DeleteUser: NextPage = () => {

  const [formState, setFormState] = useState({
    userId: '',
  });
  const [deleteuser] = useDeleteuserMutation({
    variables: {
        userId: formState.userId,
    }
  });

 
  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <form onSubmit={ e => {
        e.preventDefault();
        deleteuser()
        router.push("/");
      }}>
        <fieldset>
            <div className="pure-control-group">
            <label>User id  </label>
              <input
                value={formState.userId}
                onChange={ (e) =>
                setFormState({
                  ...formState,
                  userId: e.target.value
                })
              }
              type="text"
              placeholder="Enter an id"
              />
            </div>
        <button type="submit"> Delete User</button>
        </fieldset>
      </form>
      </main>
    </div>
  )
}

export default DeleteUser