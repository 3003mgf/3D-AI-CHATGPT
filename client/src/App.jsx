import './App.css'
import Canvas from './canvas'
import Customizer from './pages/Customizer'
import HomePage from './pages/Home'

function App() {

  return (
    <main className='app transition-all ease-in'>
      <HomePage/>
      <Canvas/>
      <Customizer/>
    </main>
  )
}

export default App
