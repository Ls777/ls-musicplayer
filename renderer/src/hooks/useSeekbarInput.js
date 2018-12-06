import { useState, useEffect, useRef } from 'react'

export default (callback, storeValue) => {
  const [seeking, setSeeking] = useState(false)
  const [inputValue, setInputValue] = useState(0)
  const timeout = useRef()

  const onMouseDown = e => {
    clearTimeout(timeout.current)
    setSeeking(true)
  }

  const onChange = e => {
    setInputValue(e.target.value)
    setSeeking(true)
  }

  const onMouseUp = e => {
    callback(inputValue).then(
      () => (timeout.current = setTimeout(() => setSeeking(false), 500))
    )
  }
  const value = seeking ? inputValue : storeValue

  return { value, onMouseDown, onChange, onMouseUp }
}
