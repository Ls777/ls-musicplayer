import React from 'react'
import { useStore, useAction } from 'easy-peasy'

export default () => {
  const { percentage } = useStore(state => state.seekbar)
  const { seek } = useAction(dispatch => dispatch.seekbar)
  return (
    <input
      id='slide'
      type='range'
      min='0'
      max='100'
      step='1'
      value={percentage}
      onChange={e => seek(e.target.value)}
    />
  )
}
