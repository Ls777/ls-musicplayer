import { useEffect } from 'react'

export default () => {
  useEffect(() => {
    window.addEventListener('keydown', prevDefault, false)
    return () => window.removeEventListener('keydown', prevDefault, false)
  }, [])

  function prevDefault (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault()
    }
  }
}
