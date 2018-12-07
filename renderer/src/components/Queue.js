import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useStore, useAction } from 'easy-peasy'
import useKeyboardList from '../hooks/useKeyboardList'
import PerfectScrollbar from 'react-perfect-scrollbar'
import styled from 'styled-components'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { timeDisplay } from '../lib/utilities'

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
  console.log('whats goin on')
  console.log('queue')
  return (
    <QueueWrapper onKeyDown={onKeyPress} tabIndex='0'>
      <PerfectScrollbar
        ref={ref => (scrollRef.current = ref)}
        containerRef={ref => (queueRef.current = ref)}
        style={{ padding: '0' }}
        option={{ handlers: ['click-rail', 'drag-thumb', 'wheel', 'touch'] }}
      >
        <List
          queue={queue}
          queuePos={queuePos}
          selectPos={selectPos}
          setSelectPos={setSelectPos}
          skipTo={skipTo}
        />
      </PerfectScrollbar>
    </QueueWrapper>
  )
}

const List = ({ queue, queuePos, selectPos, setSelectPos, skipTo }) => (
  <ul>
    {queue.map((item, idx) => (
      <Item
        key={item.id}
        item={item}
        idx={idx}
        setSelectPos={setSelectPos}
        skipTo={skipTo}
        current={idx === queuePos}
        select={idx === selectPos}
      />
    ))}
  </ul>
)

const Item = ({ item, idx, setSelectPos, skipTo, current, select }) => {
  const child = useMemo(
    () => (
      <QueueItem
        onDoubleClick={() => skipTo(item.id)}
        onClick={e => {
          setSelectPos(idx)
        }}
        current={current}
        select={select}
      >
        <Duration current={current} duration={item.duration} />
        <Title>{item.title}</Title> <Artist>{item.artist}</Artist>
      </QueueItem>
    ),
    [item, idx, setSelectPos, skipTo, current, select]
  )

  return <>{child}</>
}

const Duration = ({ current, duration }) => {
  const { remaining } = useStore(state => state.seekbar)
  const time = timeDisplay(current ? remaining : duration)
  const child = useMemo(() => <DurationStyle>{time}</DurationStyle>, [time])
  return <>{child}</>
}

const QueueWrapper = styled.div`
  flex-shrink: 1;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #f2e9e1;
  ul {
    margin: 0;
  }
`

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
