import type { NextPage } from 'next'
import { useState } from 'react';
import { useLoginMutation } from '../generated'
import styles from '../styles/Home.module.css'
import router, { useRouter } from 'next/router';


const Login: NextPage = () => {

  const [formState, setFormState] = useState({
    name: '',
    password:''
  });
  const [login] = useLoginMutation({
    variables: {
        
        username: formState.name,
        password: formState.password
      }

  });

 
  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <form onSubmit={ e => {
        e.preventDefault();
        login();
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
        <button type="submit"> Log in </button>
        </fieldset>
      </form>
      </main>
    </div>
  )
}

export default Login