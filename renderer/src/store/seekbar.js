import { select, effect } from 'easy-peasy'

export default {
  elapsed: 0,
  duration: 0,
  remaining: select(state => state.duration - state.elapsed),
  percentage: select(state => {
    if (state.duration === 0) {
      return 0
    }
    return (state.elapsed / state.duration) * 100
  }),
  setElapsed: (state, payload) => {
    state.elapsed = payload
  },
  setDuration: (state, payload) => {
    state.duration = payload || 0
  },
  seek: effect(async (dispatch, payload, getState, { mpc }) => {
    const toSeconds = (payload / 100) * getState().seekbar.duration
    if (!getState().player.isPlaying) {
      await dispatch.player.play()
      await mpc.playback.seekCur(toSeconds)
    } else {
      await mpc.playback.seekCur(toSeconds)
    }
  })
}
