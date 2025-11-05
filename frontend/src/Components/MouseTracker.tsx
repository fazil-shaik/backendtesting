import React from "react";
import { render } from "react-dom";

const MouseTracker = ({render})=>{
    const [position, setPosition] = React.useState({x:0, y:0});

    return(
        <>
            <div
      onMouseMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}
      style={{ height: '1200px', width:'1200px',border: '1px solid gray' }}
    >
      {render(position)}
    </div>
        </>
    )
}
export default MouseTracker;