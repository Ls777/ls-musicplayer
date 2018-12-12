import { select, effect } from 'easy-peasy'
import { timeDisplay } from '../lib/utilities'

export default {
  display: 'queue',
  duration: 0,

  setQueueView: (state, payload) => {
    state.display = 'queue'
  },
  setLibraryView: (state, payload) => {
    state.display = 'library'
  }
}
