import React from 'react';
import {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";

export default function GameParameters(props : any) {
  let setParameter = props.setParameter;
  const Game = useSelector((state: any) => state.Game); 
  const [padColor, setpadColor] = useState(Game.padColor);
  const dispatch = useDispatch();


  function handleForm(e : any) {
    e.preventDefault();
    let newGame = {
      padColor: padColor 
    }
    dispatch({type: "Game/setGame",payload: newGame});
    setParameter(false);
  }

  function handleChange(e : any, element : string) {
    e.preventDefault();
    switch(element) {
      case("red"):
        setpadColor("red")
        break
      case("black"):
        setpadColor("black");
        break;
    }
  }

  return (
    <>
                    <div className='fond1'></div>
                    <form className="gameparams" data-aos="fade-up" data-aos-duration="1000">
                        <div onClick={()=>setParameter(false)} className="cross-setting"></div>
                        <h2>Paramètres</h2>
                        <label>Couleur du paddle:</label>  
                        <span>Rouge</span>
                        <input type="radio"  onChange={(e)=> handleChange(e, "red")} 
                        name="type" className='room-type' checked= {padColor == "red"}>
                        </input>
                        <span>Noir</span>
                        <input type="radio" onChange={(e)=> handleChange(e, "black")} 
                        name="type" className='room-type' checked= {padColor == "black"}>
                        </input>
                    <br></br> 
                        <button onClick={handleForm}  className='btn btn-primary'>Valider</button>
                    </form>
                </>
  )
}