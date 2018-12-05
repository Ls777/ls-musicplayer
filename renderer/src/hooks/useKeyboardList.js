import { useState, useEffect } from 'react'

export default () => {
  const [pos, setPos] = useState(1)
  const increment = () => setPos(pos + 1)
  useEffect(() => {
    window.document.addEventListener('keydown', event => onKeyPress(event))
    return () => {
      window.document.removeEventListener('keydown', onKeyPress)
    }
  }, [])

  const onKeyPress = event => {
    switch (event.key) {
      case 'ArrowDown':
        increment()
        break
      case 'ArrowUp':
        break
      // no default
    }
  }

  return [pos, () => {}]
}
