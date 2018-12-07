import React, { useState, useEffect, useRef } from 'react'
import { useStore, useAction } from 'easy-peasy'
import styled from 'styled-components'

import useSeekbarInput from '../hooks/useSeekbarInput'

export default () => {
  const { percentage } = useStore(state => state.seekbar)
  const { seek } = useAction(dispatch => dispatch.seekbar)
  const { value, onMouseDown, onChange, onMouseUp } = useSeekbarInput(
    seek,
    percentage
  )

  return (
    <Wrapper>
      <Slider
        id='slide'
        type='range'
        min='0'
        max='100'
        step='0.0001'
        value={value}
        onMouseDown={onMouseDown}
        onChange={onChange}
        onMouseUp={onMouseUp}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
`

const Slider = styled.input`
  flex: 2;
  padding: 1em;
  height: 5px;
  -webkit-appearance: none;
  overflow: hidden;
  background: none;

  ::-webkit-slider-runnable-track {
    height: 100%;
    background: #f2e9e1;
    border: none;
    border-radius: 3px;
    overflow: hidden;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 100%;
    width: 5px;
    background: #1c140d;
    margin-top: 0px;
    box-shadow: -100vw 0 0 100vw #cbe86b;
    overflow: hidden;
  }
`
