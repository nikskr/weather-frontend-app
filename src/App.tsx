import AppRouter from "./components/AppRouter"
import NavBar from "./navigation/NavBar"
import './App.css'

function App() {

  return (
    <div className="container">
      <NavBar />
      <div className="content">
        <AppRouter />
      </div>
    </div>
  )
}

export default App
