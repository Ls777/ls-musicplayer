const Triology = require('trilogy')
const { join, extname } = require('path')
const { readdir, stat } = require('fs')
const { promisify } = require('util')
const jsmediatags = require('jsmediatags')

const readdirP = promisify(readdir)
const statP = promisify(stat)

const { categorize } = require('./library')

const db = new Triology('../library.db', { client: 'sql.js' })

const musicFileTypes = ['.mp3', '.flac']

let library

async function init () {
  library = await db.model('library', {
    id: { type: 'increments' },
    src: { type: String, unique: true, nullable: false },
    title: String,
    artist: String,
    album: String,
    year: String,
    comment: String,
    track: String,
    genre: String,
    lyrics: String
  })
  library.clear()
  return categorize(
    await library.find(undefined, undefined, { order: ['artist', 'album'] })
  )
}

async function rreaddir (dir, allFiles = []) {
  const files = (await readdirP(dir)).map(f => join(dir, f))
  allFiles.push(...files)
  await Promise.all(
    files.map(
      async f => (await statP(f)).isDirectory() && rreaddir(f, allFiles)
    )
  )
  return allFiles
}

async function scanDir (dir) {
  const files = await rreaddir(dir)
  const pendingTags = []
  for (let file of files) {
    const entry = await library.findOne({ src: file })
    if (!musicFileTypes.includes(extname(file))) {
      continue
    }

    if (!entry) {
      pendingTags.push(createEntry(file))
    }
  }

  await Promise.all(pendingTags)

  return categorize(
    await library.find(undefined, undefined, {
      order: ['album', 'artist', 'track']
    })
  )

  function createEntry (file) {
    return new Promise((resolve, reject) => {
      jsmediatags.read(file, {
        onSuccess: tag => {
          const {
            title = null,
            artist = null,
            album = null,
            year = null,
            comment = null,
            track = null,
            genre = null,
            lyrics = null
          } = tag.tags

          library
            .create({
              src: file,
              title,
              artist,
              album,
              year,
              comment,
              track,
              genre,
              lyrics
            })
            .then(resolve())
            .catch(err => reject(err))
        },
        onError: err => reject(err)
      })
    })
  }
}

init()
  .then(lib => (global.library = lib))
  .then(scanDir('C:\\m').then(lib => (global.library = lib)))

module.exports.db = db
module.exports.init = init
module.exports.scanDir = scanDir
