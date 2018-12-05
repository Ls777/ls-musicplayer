import React from 'react'
import { useStore, useAction } from 'easy-peasy'
import SeekBar from './SeekBar'
import styled from 'styled-components'

import {
  MdPlayArrow,
  MdPause,
  MdStop,
  MdSkipNext,
  MdSkipPrevious,
  MdLibraryMusic
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
      <Button onClick={prev}>
        <MdSkipPrevious />
      </Button>
      <Button onClick={isPlaying ? pause : play}>
        {isPlaying ? <MdPause /> : <MdPlayArrow />}
      </Button>
      <Button onClick={stop}>
        <MdStop />
      </Button>
      <Button onClick={next}>
        <MdSkipNext />
      </Button>
      <Button onClick={() => openChildWindow('library')}>
        <MdLibraryMusic />
      </Button>
    </>
  )
}

const Button = styled.button`
  background-color: #f2e9e1;
  border: none;
  color: #1c140d;
  padding: 0.5em 1em;
  text-align: center;
  text-decoration: none;
  display: inline-block;

  :hover {
    background-color: #cbe86b;
  }
`
