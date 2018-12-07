export const timeDisplay = num => {
  const sec = Math.floor(num)
  const min = Math.floor(sec / 60)
  const s = (sec % 60).toString().padStart(2, '0')
  return `${min}:${s}`
}
