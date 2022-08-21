import React from 'react'
import "../styles/Components/Custom.css"

export default function Custom() {
  return (
    <div className="custom-form" data-aos="fade-up" data-aos-duration="1000">
        
        <div className="vignette"></div>
        <form >
            <h2>Choisie ton pseudo</h2>
            <input></input>
            <button className="btn btn-primary">Valider</button>
        </form>
    </div>
  )
}
