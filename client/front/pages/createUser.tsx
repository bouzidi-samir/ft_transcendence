import type { NextPage } from 'next'
import { useState } from 'react';
import { useUserCreateMutation } from '../generated'



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
    <div>
      <form onSubmit={ e => {
        e.preventDefault();
        userCreate()
      }}
      className="pure-form pure-form-aligned">
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
    </div>
  )
}

export default CUser