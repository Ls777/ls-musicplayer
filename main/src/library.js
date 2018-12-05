module.exports.categorize = library => ({
  all: library,
  artistSong: songFilter(library, 'artist'),
  genreSong: songFilter(library, 'genre'),
  albumSong: songFilter(library, 'album'),
  artistAlbumSong: doublesongFilter(library, 'artist', 'album')
})

const songFilter = (arr, filter) =>
  arr.reduce((acc, item) => {
    let idx = acc.findIndex(song => song.category === item[filter])
    if (idx === -1) {
      idx =
        acc.push({
          category: item[filter],
          items: []
        }) - 1
    }
    acc[idx].items.push(item)
    return acc
  }, [])

const doublesongFilter = (arr, filter, filter2) => {
  const returnArr = songFilter(arr, filter)
  returnArr.forEach(obj => (obj.items = songFilter(obj.items, filter2)))
  return returnArr
}
