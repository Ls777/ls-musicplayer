import { select, effect } from 'easy-peasy'

export default {
  status: 'stop',
  isPlaying: select(state => state.status === 'play'),
  isPaused: select(state => state.status === 'pause'),
  isStopped: select(state => state.status === 'stop'),

  setStatus: (state, payload) => {
    state.status = payload
  },

  play: effect(async (dispatch, payload, getState, { mpc }) => {
    if (getState().player.isStopped) {
      mpc.playback.playId(getState().queue.currentTrack.id)
    } else {
      mpc.playback.play()
    }
    dispatch.player.setStatus('play')
  }),

  pause: effect(async (dispatch, payload, getState, { mpc }) => {
    mpc.playback.pause()
    dispatch.player.setStatus('pause')
  }),

  stop: effect(async (dispatch, payload, getState, { mpc }) => {
    mpc.playback.stop()
    dispatch.player.setStatus('stop')
  }),

  skipTo: effect(async (dispatch, payload, getState, { mpc }) => {
    dispatch.queue.setQueuePos(
      getState().queue.queue.findIndex(el => el.id === payload)
    )
    mpc.playback.playId(payload)
    dispatch.player.setStatus('play')
  }),

  next: effect(async (dispatch, payload, getState, { mpc }) => {
    dispatch.queue.setQueuePos(getState().queue.queuePos + 1)
    if (!getState().player.isStopped) {
      mpc.playback.next()
      dispatch.player.setStatus('play')
    }
  }),

  prev: effect(async (dispatch, payload, getState, { mpc }) => {
    dispatch.queue.setQueuePos(getState().queue.queuePos - 1)
    if (!getState().player.isStopped) {
      mpc.playback.previous()
      dispatch.player.setStatus('play')
    }
  }),

  fetchStoredQueue: effect(async (dispatch, payload, getState) => {
    let queue = []
    dispatch.player.setQueue(queue)
  })
}
