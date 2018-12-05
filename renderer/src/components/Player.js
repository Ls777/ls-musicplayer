import React from 'react'
import { useStore, useAction } from 'easy-peasy'
import SeekBar from './SeekBar'

const { ipcRenderer, remote } = window.require('electron')

const openChildWindow = route => {
  ipcRenderer.send('open-child-window', route)
}

export default () => {
  const { isPlaying } = useStore(state => state.player)
  const { play, pause, stop, next, prev, skipTo } = useAction(
    dispatch => dispatch.player
  )
  return (
    <>
      <h3>Player</h3>
      <div>{isPlaying ? 'yes' : 'no'}</div>
      <SeekBar />
      <button onClick={() => prev()}>prev</button>
      <button onClick={isPlaying ? () => pause() : () => play()}>
        {isPlaying ? 'pause' : 'play'}
      </button>
      <button onClick={() => stop()}>stop</button>
      <button onClick={() => next()}>next</button>
      <button onClick={() => openChildWindow('settings')}>
        open child window
      </button>
    </>
  )
}
