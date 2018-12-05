import { useState, useEffect } from 'react'

export default (max, callback, ref) => {
  const [pos, setPos] = useState(0)
  useEffect(
    () => {
      ref.current.focus()
      setPos(0)
    },
    [max, ref]
  )

  useEffect(
    () => {
      const listHeight = 230
      const posHeight = pos * 21
      if (posHeight > ref.current.scrollTop + listHeight) {
        ref.current.scrollTop = posHeight - listHeight
      } else if (posHeight < ref.current.scrollTop) {
        ref.current.scrollTop = posHeight
      }
    },
    [pos, max]
  )

  const onKeyPress = event => {
    switch (event.key) {
      case 'ArrowDown':
        setPos(prev => (prev < max ? prev + 1 : prev))
        break
      case 'ArrowUp':
        setPos(prev => (prev > 0 ? prev - 1 : prev))
        break
      case 'Enter':
        callback(pos)
        break
      // no default
    }
  }

  return [pos, setPos, onKeyPress]
}
