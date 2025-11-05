import './App.css'
import HOC from './Components/HOC'
// import MouseTracker from './Components/MouseTracker'
function App() {

  return (
    <>
    {/* <MouseTracker render={({x, y})=>(
      <h1>The mouse position is ({x}, {y})</h1>
    )}/> */}
    <HOC name={'shaik'} />
    </>
  )
}

export default App
