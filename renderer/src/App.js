import React, { useEffect } from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import './App.css'
import FrontEnd from './FrontEnd'
import Settings from './Settings'
import Library from './components/Library'
import LibrarySplit from './components/LibrarySplit'
import { useAction } from 'easy-peasy'
import { IconContext } from 'react-icons'

const App = () => {
  // const initialize = useAction(dispatch => dispatch.player.fetchStoredQueue)
  // useEffect(() => initialize(), [])
  return (
    <Router>
      <IconContext.Provider
        value={{ size: '2em', style: { verticalAlign: 'middle' } }}
      >
        <Route path='/' exact component={FrontEnd} />
        <Route path='/settings' component={Settings} />
        <Route path='/library' component={LibrarySplit} />
      </IconContext.Provider>
    </Router>
  )
}

export default App
