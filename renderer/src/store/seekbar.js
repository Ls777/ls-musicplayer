import { select, effect } from 'easy-peasy'

export default {
  elapsed: 0,
  duration: 0,
  percentage: select(state => {
    if (state.duration === 0) {
      return 0
    }
    return Math.round((state.elapsed / state.duration) * 100)
  }),
  setPosition: (state, payload) => {
    state.elapsed = payload
  },
  setDuration: (state, payload) => {
    state.duration = payload || 0
  },
  seek: effect(async (dispatch, payload, getState, { mpc }) => {
    const toSeconds = (payload / 100) * getState().seekbar.duration
    if (!getState().player.isPlaying) {
      await dispatch.player.play()
      mpc.playback.seekCur(toSeconds)
    } else {
      mpc.playback.seekCur(toSeconds)
    }
  })
}
