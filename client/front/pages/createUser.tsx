import type { NextPage } from 'next'
import router, { useRouter } from 'next/router';
import { useState } from 'react';
import { useUserCreateMutation } from '../generated'
import styles from '../styles/Home.module.css'


const CUser: NextPage = () => {

  const [formState, setFormState] = useState({
    name: '',
    email:'',
    password:''
  });
  const [userCreate] = useUserCreateMutation({
    variables: {
      input: {
        name: formState.name,
        email: formState.email,
        password: formState.password
      }
    }
  });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <form onSubmit={ e => {
        e.preventDefault();
        userCreate();
        router.push("/");
      }}
      >
        <fieldset>
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
              placeholder="Enter a name"
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
                placeholder="Enter an email"
                />
            </div>
            <div className="pure-control-group">
              <label>Password  </label>
            <input
                value={formState.password}
                onChange={ (e) =>
                  setFormState({
                    ...formState,
                    password: e.target.value
                  })
                }
              type="text"
              placeholder="Enter a password"
              />
            </div>
        <button type="submit"> Add User</button>
        </fieldset>
      </form>
      </main>
    </div>
  )
}

export default CUser