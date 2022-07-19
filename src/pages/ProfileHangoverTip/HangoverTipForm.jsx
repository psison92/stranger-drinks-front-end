import { useState, useRef, useEffect } from "react"



const HangoverTip = (props) => {

  const [hangoverTip, setHangoverTip] = useState([])

  const handleCreateTip = evt => {
    setHangoverTip({...hangoverTip, [evt.target.hangoverTip]: evt.target.value })
  }

  
  return(
    <>
    <div>
      <h2>Hello bro, This will be where you put a hangover tip for {props.user.name}</h2>
      <div>
        <form autoComplete='off' method="POST">
          <label>
            <h3>Whats This Called</h3>
          <input type="text" name="title" id="tip-title"/>
          </label>
          <label>
            <h3>Whats The Tip </h3> 
            <input type="text" name="text" id="tip-text" />      
          </label>
          <button type="submit">Share your secret</button>
        </form>
      </div>
    </div>
    
    </>
    
  )

}

export default HangoverTip