import { useState } from "react";
function App(){
  const[count, setCount]=useState(0);

  return(
    <>
      <p style={{padding:'10px 20px', fontSize:'25px'}}> count is {count}</p>
      <button onClick={()=>setCount(count+1)} style={{padding:'10px 20px', fontSize:'25px',backgroundColor:'red'}}>Increment</button><br></br>
      <button onClick={()=>setCount(count-1)}>Decrement</button><br></br>
      <button onClick={()=>setCount(0)}>Reset</button>
    </>
  );
}

export default App;