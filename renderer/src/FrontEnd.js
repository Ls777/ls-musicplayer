import React from 'react'
import { useStore, useAction } from 'easy-peasy'
import styled from 'styled-components'
import mpc from './lib/mpc'
import SeekBar from './components/SeekBar'
import Queue from './components/Queue'
import Library from './components/Library'
import Player from './components/Player'

const { ipcRenderer, remote } = window.require('electron')

const openChildWindow = route => {
  ipcRenderer.send('open-child-window', route)
}

export default () => {
  return (
    <div>
      <QueueSection>
        <Queue />
      </QueueSection>
      <section>
        <Player />
      </section>
      <QueueSection>
        <Library />
      </QueueSection>
    </div>
  )
}

const QueueSection = styled.section`
  height: 300px;
  max-height: 300px;
  overflow-y: scroll;
  background-color: paleturquoise;
`
