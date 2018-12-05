import { select, effect } from 'easy-peasy'

export default {
  artistView: [],

  setArtistView: (state, payload) => {
    state.artistView = payload
  }
}
