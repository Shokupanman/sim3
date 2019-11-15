import React from 'react'
import './App.css'
import routes from './routes'
import Nav from './Componenets/Nav/Nav'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
        {routes}
      </header>
    </div>
  )
}

export default App
