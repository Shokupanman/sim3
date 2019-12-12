import React from 'react'
import './App.css'
import routes from './routes'
import Nav from './Componenets/Nav/Nav'

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <Nav history={props.history} />
        {routes}
      </header>
    </div>
  )
}

export default App
