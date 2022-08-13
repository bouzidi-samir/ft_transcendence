import type { NextPage } from 'next'
import router, { useRouter } from 'next/router';
import { useState } from 'react';
import { useLoginMutation, useUserCreateMutation } from '../generated'
import styles from '../styles/Auth.module.css'

let set: 1;

const Signup: NextPage = () => {

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
            userCreate();
            set++;
            if(set > 1){
            login();
            }
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
            <button type="submit"> Sign up</button>
            </fieldset>
          </form>
          </main>
        </div>
      )
    }
export default Signup