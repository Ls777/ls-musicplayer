import { select, effect } from 'easy-peasy'

export default {
  queue: [],
  queuePos: 0,
  queueLoop: false,

  currentTrack: select(state => state.queue[state.queuePos] || null),
  nextTrack: select(state => state.queue[state.queuePos + 1] || null),

  setQueue: (state, payload) => {
    state.queue = payload
  },

  setQueuePos: (state, payload) => {
    if (payload >= 0 && payload < state.queue.length) {
      state.queuePos = payload
    } else {
      state.queuePos = 0
    }
  },

  addToQueue: effect(async (dispatch, payload, getState, { mpc }) => {
    mpc.database.findAdd(payload)
  }),

  removeFromQueue: effect(async (dispatch, payload, getState, { mpc }) => {
    mpc.database.findAdd(payload)
  }),

  replaceQueue: effect(async (dispatch, payload, getState, { mpc }) => {
    await mpc.currentPlaylist.clear()
    await mpc.database.findAdd(payload)
    dispatch.player.play()
    // console.log(await mpc.database.find(payload))
  })
}
