import React from 'react'
import { useStore, useAction } from 'easy-peasy'
import styled from 'styled-components'

const statusDisplay = {
  play: 'Playing',
  pause: 'Paused',
  stop: 'Stopped'
}

export default () => {
  const { status } = useStore(state => state.player)
  const { currentTrack } = useStore(state => state.queue)
  const titleString = `${statusDisplay[status]} | ${currentTrack &&
    `${currentTrack.artist} | ${currentTrack.album} | ${currentTrack.title}`}`
  return <TitleBar>{titleString}</TitleBar>
}

const TitleBar = styled.div`
  flex: none;
  -webkit-app-region: drag;
  padding: 0.2em 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  background-color: #cbe86b;
`
