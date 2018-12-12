import React from 'react'
import { useStore, useAction } from 'easy-peasy'
import styled from 'styled-components'
import mpc from './lib/mpc'
import useDisableKeyboardScrolling from './hooks/useDisableKeyboardScrolling'
import SeekBar from './components/SeekBar'
import Queue from './components/Queue'
import Library from './components/Library'
import LibrarySplit from './components/LibrarySplit'
import Player from './components/Player'
import TitleBar from './components/TitleBar'

const { ipcRenderer, remote } = window.require('electron')

const openChildWindow = route => {
  ipcRenderer.send('open-child-window', route)
}

export default () => {
  useDisableKeyboardScrolling()
  const display = useStore(state => state.ui.display)
  return (
    <App>
      <TitleBar />
      {display === 'queue' ? <Queue /> : <LibrarySplit />}
      <section>
        <Player />
      </section>
    </App>
  )
}

const App = styled.div`
  height: 100%;
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const QueueSection = styled.section`
  height: 100px;
  background-color: #f2e9e1;
`

const PlayerSection = styled.section`
  height: 200px;
`
