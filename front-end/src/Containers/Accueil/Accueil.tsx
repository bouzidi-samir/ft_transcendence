import "./Accueil.css"
import React from "react";

export default function Accueil() {

    return (
        <>
        <div className="custom-content">
           <div className="pong" data-aos="fade-up" data-aos-duration="2000"></div>
            <div className="custom-title">
                <h1  data-aos="fade-right" data-aos-duration="2000">Master Pong</h1>
                <button data-aos="fade-left"  data-aos-duration="2000" className="btn btn-primary">
                    Commencer
                </button>
            </div>
            <div className="pong" data-aos="fade-down" data-aos-duration="2000"></div>
        </div>
        </>
    )
}