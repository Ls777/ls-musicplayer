import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useStore, useAction } from 'easy-peasy'
import { List, ArrowKeyStepper, AutoSizer } from 'react-virtualized'
import MyArrowStepper from '../lib/MyArrowKeyStepper'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import styled from 'styled-components'
import { timeDisplay } from '../lib/utilities'
import KeyboardList from './KeyboardList'

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
  const baseStyle = {
    height: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1em'
  }

  const durationStyle = {
    flexShrink: '0',
    width: '2em'
  }

  const titleStyle = {
    flex: '1 1',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '0 1em'
  }

  const artistStyle = {
    flexShrink: '0'
  }

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
      onDoubleClick={() => callback(item.id)}
    >
      <div style={itemStyle}>
        {selected && isVisible && !isScrolling ? (
          <DynamicDuration />
        ) : (
          <span style={durationStyle}>{timeDisplay(item.duration)}</span>
        )}
        <span style={titleStyle}>{item.title}</span>
        <span style={artistStyle}>{item.artist}</span>
      </div>
    </div>
  )
}

export default () => {
  const { play, skipTo } = useAction(dispatch => dispatch.player)

  const { queue, queuePos } = useStore(state => state.queue)

  const onKeyDown = ({ event, scrollToRow }) => {
    if (event.key === 'Enter') {
      skipTo(queue[scrollToRow].id)
    }
  }

  return (
    <KeyboardList
      renderer={renderer}
      onKeyDown={onKeyDown}
      list={queue}
      listPos={queuePos}
      callback={skipTo}
    />
  )
}

const DynamicDuration = () => {
  const { remainingDisplay } = useStore(state => state.seekbar)
  return <DurationStyle>{remainingDisplay}</DurationStyle>
}

const QueueItem = styled.li`
  font-weight: ${({ current }) => (current ? 'bold' : 'normal')};
  background-color: ${({ select }) => (select ? '#CBE86B' : 'none')};
  display: flex;
  justify-content: space-between;
  padding: 0 1em;
`

const Title = styled.span`
  flex: 1 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 1em;
`

const Artist = styled.span`
  flex-shrink: 0;
`

const DurationStyle = styled.span`
  flex-shrink: 0;
  width: 2em;
`

const AppWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
