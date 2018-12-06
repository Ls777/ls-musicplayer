import store from '../store'
const { ipcRenderer, remote } = window.require('electron')

const mpc = remote.getGlobal('mpc')

const handleErr = err => {
  console.log(err)
  throw new Error(err)
}

async function init () {
  try {
    await mpc.connectTCP('localhost', 6600)
  } catch (e) {
    console.log('Still connected')
  } finally {
    mpc.reflection.tagTypes().then(console.log)
    mpc.currentPlaylist.playlistInfo().then(console.log)
    const { setArtistView } = store.dispatch.library
    mpc.database.listToArray('Album', [], ['Artist']).then(setArtistView)
    setStoreQueue()
    setStoreStatus()
  }
}

init()

mpc.on('changed-player', () => {
  const { play, pause, next, prev, skipTo } = store.dispatch.player

  setStoreQueue()
  setStoreStatus()

  mpc.status
    .status()
    .then(status => {
      if (status.state === 'play') {
        mpc.status
          .currentSong()
          .then(song => console.log(`Playing '${song.title}'`))
      } else {
        console.log('Stopped playback')
      }
    })
    .catch(console.log)
})

mpc.on('changed-playlist', () => {
  setStoreQueue()
})

function setStoreQueue () {
  const { setQueue, setQueuePos } = store.dispatch.queue
  mpc.currentPlaylist
    .playlistInfo()
    .then(setQueue)
    .catch(console.log)
  mpc.status.currentSong().then(song => setQueuePos(song ? song.position : 0))
}

function setStoreStatus () {
  const { setStatus } = store.dispatch.player
  const { setDuration, setElapsed } = store.dispatch.seekbar
  mpc.status
    .status()
    .then(status => {
      setStatus(status.state)
      if (status.duration) {
        setDuration(status.duration)
      } else {
        setElapsed(0)
      }
    })
    .catch(console.log)
}

setInterval(() => {
  const { isPlaying } = store.getState().player
  const { setElapsed } = store.dispatch.seekbar
  if (isPlaying) {
    mpc.status.status().then(status => setElapsed(status.elapsed))
  }
}, 200)

export default mpc
