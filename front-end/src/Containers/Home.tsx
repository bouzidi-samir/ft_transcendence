import "../styles/Containers/Home.css"
import React from 'react'
import {BrowserRouter as Router, Route, Link, useSearchParams} from 'react-router-dom';
import { useEffect, useState } from 'react'
import Navbar from "../Components/Navbar"
import Dashboard from "../Components/Dashboard"

export default function Home() {

  const [params] = useSearchParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const code = params.get("code")
		const {hostname, port} = document.location
		if (code)
		{
			setLoading(true)
			const request = fetch(`http://localhost:4000/auth/token/${code}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'cors': 'true'
				},
				body: JSON.stringify({redirect_uri: 'http://localhost:3000/Home'})
			})
			request.then(response => response.json()
      .then((response) => {
        console.log(response);
			}))
			request.catch(e => {console.error(e)})
		}
		return () => {}
  }, [])

  return (
    <>
      <Navbar/>
      <Dashboard/> 
    </>
  )
}
