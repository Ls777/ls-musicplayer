import React from 'react'
import { useStore, useAction } from 'easy-peasy'
import SeekBar from './SeekBar'

import {
  MdPlayArrow,
  MdPause,
  MdStop,
  MdSkipNext,
  MdSkipPrevious
} from 'react-icons/md'

const { ipcRenderer, remote } = window.require('electron')

const openChildWindow = route => {
  ipcRenderer.send('open-child-window', route)
}

export default () => {
  const { isPlaying } = useStore(state => state.player)
  const { currentTrack } = useStore(state => state.queue)
  const { play, pause, stop, next, prev, skipTo } = useAction(
    dispatch => dispatch.player
  )
  return (
    <>
      <h3>Player</h3>
      <div>
        {currentTrack &&
          `${currentTrack.artist} - ${currentTrack.album} - ${
            currentTrack.title
          }`}
      </div>
      <SeekBar />
      <button onClick={prev}>
        <MdSkipPrevious />
      </button>
      <button onClick={isPlaying ? pause : play}>
        {isPlaying ? <MdPause /> : <MdPlayArrow />}
      </button>
      <button onClick={stop}>
        <MdStop />
      </button>
      <button onClick={next}>
        <MdSkipNext />
      </button>
      <button onClick={() => openChildWindow('library')}>
        open child window
      </button>
    </>
  )
}
