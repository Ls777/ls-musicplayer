import { createStore } from 'easy-peasy'
import player from './player'
import library from './library'
import queue from './queue'
import seekbar from './seekbar'
const { remote } = window.require('electron')

const mpc = remote.getGlobal('mpc')

export default createStore(
  { player, library, queue, seekbar },
  { injections: { mpc } }
)
