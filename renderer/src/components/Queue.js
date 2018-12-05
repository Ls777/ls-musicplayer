import React, { useState } from 'react'
import { useStore, useAction } from 'easy-peasy'
import useKeyboardList from '../hooks/useKeyboardList'

export default () => {
  const { queue, queuePos } = useStore(state => state.queue)
  const [selectPos, setSelectPos] = useKeyboardList(0)
  const { play, skipTo } = useAction(dispatch => dispatch.player)
  return (
    <>
      <h3>Queue {selectPos}</h3>
      <ul>
        {queue.map((item, idx) => (
          <li onDoubleClick={() => skipTo(item.id).then(play())} key={item.id}>
            {item.title + (idx === queuePos ? ' -- now playing!' : '')}
          </li>
        ))}
      </ul>
    </>
  )
}
