import React, { useState, useRef } from 'react'
import { useStore, useAction } from 'easy-peasy'
import useKeyboardList from '../hooks/useKeyboardList'
import styled from 'styled-components'

export default () => {
  const queueRef = useRef(null)
  const { queue, queuePos } = useStore(state => state.queue)
  const { play, skipTo } = useAction(dispatch => dispatch.player)
  const [selectPos, setSelectPos, onKeyPress] = useKeyboardList(
    queue.length - 1,
    pos => skipTo(queue[pos].id),
    queueRef
  )
  return (
    <section onKeyDown={onKeyPress} tabIndex='0' ref={queueRef}>
      <h3>Queue {selectPos}</h3>
      <ul onKeyPress={console.log}>
        {queue.map((item, idx) => (
          <QueueItem
            onDoubleClick={() => skipTo(item.id)}
            onClick={() => setSelectPos(idx)}
            key={item.id}
            current={idx === queuePos}
            select={idx === selectPos}
          >
            <Title>{item.title}</Title> <Artist>{item.artist}</Artist>
          </QueueItem>
        ))}
      </ul>
    </section>
  )
}

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
