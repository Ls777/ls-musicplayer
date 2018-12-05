const { MPC } = require('mpc-js')

const mpc = new MPC()

mpc.database.listToArray = async (...args) =>
  [...(await mpc.database.list(...args))].sort((a, b) =>
    a[0][0].localeCompare(b[0][0])
  )

global.mpc = mpc
