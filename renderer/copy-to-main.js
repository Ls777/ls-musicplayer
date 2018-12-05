var fs = require('fs-extra')

fs.emptyDir(__dirname + '/../main/build', err => {
  if (err) return console.error(err)
  console.log('clear success!')

  fs.copy(__dirname + '/build', __dirname + '/../main/build', err => {
    if (err) return console.error(err)
    console.log('copy build success!')
  })

  fs.copy(__dirname + '/../main/src', __dirname + '/../main/build', err => {
    if (err) return console.error(err)
    console.log('copy src success!')
  })
})
