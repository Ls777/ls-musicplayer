import React, { useEffect } from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import './App.css'
import FrontEnd from './FrontEnd'
import Settings from './Settings'
import { useAction } from 'easy-peasy'

const App = () => {
  // const initialize = useAction(dispatch => dispatch.player.fetchStoredQueue)
  // useEffect(() => initialize(), [])
  return (
    <Router>
      <div>
        <Route path='/' exact component={FrontEnd} />
        <Route path='/settings' component={Settings} />
      </div>
    </Router>
  )
}

export default App
