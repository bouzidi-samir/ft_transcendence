import { Int } from '@nestjs/graphql';
import type { NextPage } from 'next'
import router, { useRouter } from 'next/router';
import { useState } from 'react';
import { useUserUpdateMutation } from '../generated'
import styles from '../styles/Home.module.css'


const UpdateUser: NextPage = () => {

  const [formState, setFormState] = useState({
    ID:'',
    avatar:'',
    name: '',
    email:'',
    lastScore:Int,
    bestScore:Int,
    online:Boolean

  });
  const [userUpdate] = useUserUpdateMutation({
    variables: {
        userId: formState.ID,
      input: {
        avatar: formState.avatar,
        name: formState.name,
        email: formState.email,
        online: true
      }
    }
  });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <form onSubmit={ e => {
        e.preventDefault();
        userUpdate();
        router.push("/");
      }}
      >
        <fieldset>
        <div className="pure-control-group">
            <label>Avatar  </label>
              <input
                value={formState.avatar}
                onChange={ (e) =>
                setFormState({
                  ...formState,
                  avatar: e.target.value
                })
              }
              type="text"
            //   placeholder="Enter a name"
              />
            </div>
            <div className="pure-control-group">
            <label>Name  </label>
              <input
                value={formState.name}
                onChange={ (e) =>
                setFormState({
                  ...formState,
                  name: e.target.value
                })
              }
              type="text"
            //   placeholder="Enter a name"
              />
            </div>
            <div className="pure-control-group">
            <label>Email  </label>
            <input
                value={formState.email}
                onChange={ (e) =>
                  setFormState({
                    ...formState,
                    email: e.target.value
                  })
                }
                type="text"
                // placeholder="Enter an email"
                />
            </div>
        <button type="submit"> Update </button>
        </fieldset>
      </form>
      </main>
    </div>
  )
}

export default UpdateUser