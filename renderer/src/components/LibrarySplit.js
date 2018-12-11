import React, { useState } from 'react'
import { useStore, useAction } from 'easy-peasy'
import KeyBoardList from './KeyboardList'
import styled from 'styled-components'

const renderer = ({
  index,
  key,
  style,
  isVisible,
  isScrolling,
  focused,
  selected,
  item,
  onClick,
  callback
}) => {
  let itemStyle = focused
    ? { backgroundColor: '#CBE86B', ...baseStyle }
    : { backgroundColor: '#f2e9e1', ...baseStyle }
  itemStyle = selected
    ? { fontWeight: 'bold', ...itemStyle }
    : { fontWeight: 'normal', ...itemStyle }

  return (
    <div
      key={key}
      style={style}
      onClick={onClick}
      onDoubleClick={() => callback(index)}
    >
      <div style={itemStyle}>{item[0]}</div>
    </div>
  )
}

const renderer2 = ({
  index,
  key,
  style,
  isVisible,
  isScrolling,
  focused,
  selected,
  item,
  onClick,
  callback
}) => {
  let itemStyle = focused
    ? { backgroundColor: '#CBE86B', ...baseStyle }
    : { backgroundColor: '#f2e9e1', ...baseStyle }
  itemStyle = selected
    ? { fontWeight: 'bold', ...itemStyle }
    : { fontWeight: 'normal', ...itemStyle }

  return (
    <div
      key={key}
      style={style}
      onClick={onClick}
      onDoubleClick={() => callback([['Album', item]])}
    >
      <div style={itemStyle}>{item}</div>
    </div>
  )
}

export default () => {
  const { artistView } = useStore(state => state.library)
  const { replaceQueue } = useAction(dispatch => dispatch.queue)
  const [currentArtist, setCurrentArtist] = useState(0)
  console.log(artistView)
  console.log(currentArtist)
  console.log(artistView[currentArtist])

  const albums = artistView[currentArtist] ? artistView[currentArtist][1] : null
  console.log(albums)

  const onKeyDownArtist = ({ event, scrollToRow }) => {
    if (event.key === 'Enter') {
      setCurrentArtist(scrollToRow)
    }
  }

  const onKeyDownAlbum = ({ event, scrollToRow }) => {
    if (event.key === 'Enter') {
      replaceQueue([['Album', artistView[currentArtist][1][scrollToRow]]])
    }
  }

  return (
    <Wrapper>
      <KeyBoardList
        list={artistView}
        listPos={currentArtist}
        renderer={renderer}
        callback={setCurrentArtist}
        onKeyDown={onKeyDownArtist}
      />
      <KeyBoardList
        list={albums}
        listPos={-1}
        renderer={renderer2}
        callback={replaceQueue}
        onKeyDown={onKeyDownAlbum}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 400px;
  align-items: stretch;
  background-color: #f2e9e1;
`

const baseStyle = {
  height: '30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 1em'
}
