import "../../styles/Components/Authentification/LoginForm.css"
import { useEffect, useState} from 'react';

export default function AuthForm() {
  
  const handleFourtyTwo = async (e : any) => {	
  e.preventDefault()
  const {hostname, port} = document.location;


   let request = await fetch(`http://${hostname}:4000/auth/authorize`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
        'cors': 'true'
			},
			body: JSON.stringify({redirect_uri: `http://${hostname}:${port}`})
		});
    let response = await request.json();
		document.location.href = response.url;
    
  }
  return (
    <>
          <form className="auth-form">
          <h1 >Master Pong</h1>
              <p>Sign with</p>
              <div className="sign">
                <button onClick={handleFourtyTwo} 
                    className="logo42">
                </button>
              </div>
              
          </form>
      
    </>
  )
}