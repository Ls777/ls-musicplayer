import React, { useState, useEffect, useRef } from 'react'
import { useStore, useAction } from 'easy-peasy'
import useKeyboardList from '../hooks/useKeyboardList'
import PerfectScrollbar from 'react-perfect-scrollbar'
import styled from 'styled-components'
import 'react-perfect-scrollbar/dist/css/styles.css'

export default () => {
  const queueRef = useRef(null)
  const scrollRef = useRef(null)
  const { queue, queuePos } = useStore(state => state.queue)
  const { play, skipTo } = useAction(dispatch => dispatch.player)
  const [selectPos, setSelectPos, onKeyPress] = useKeyboardList(
    queue.length - 1,
    pos => skipTo(queue[pos].id),
    queueRef
  )
  // useEffect(() => scrollRef.current.updateScroll())

  return (
    <QueueWrapper onKeyDown={onKeyPress} tabIndex='0'>
      <PerfectScrollbar
        ref={ref => (scrollRef.current = ref)}
        containerRef={ref => (queueRef.current = ref)}
        option={{ handlers: ['click-rail', 'drag-thumb', 'wheel', 'touch'] }}
      >
        <ul onKeyPress={console.log}>
          {queue.map((item, idx) => (
            <QueueItem
              onDoubleClick={() => skipTo(item.id)}
              onClick={e => {
                setSelectPos(idx)
              }}
              key={item.id}
              current={idx === queuePos}
              select={idx === selectPos}
            >
              <Title>{item.title}</Title> <Artist>{item.artist}</Artist>
            </QueueItem>
          ))}
        </ul>
      </PerfectScrollbar>
    </QueueWrapper>
  )
}

const QueueWrapper = styled.div`
  flex-shrink: 1;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #f2e9e1;
`

const QueueItem = styled.li`
  font-weight: ${({ current }) => (current ? 'bold' : 'normal')};
  background-color: ${({ select }) => (select ? '#CBE86B' : 'none')};
  display: flex;
  justify-content: space-between;
  padding: 0 1em;
`

const Title = styled.span`
  flex-shrink: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Artist = styled.span`
  flex-shrink: 0;
`
