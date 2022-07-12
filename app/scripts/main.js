const buildSquare = () => ({
  isOn: false,
  neighbours: 0
})

const buildRow = (len) =>
  [...Array(len)].map(_ => buildSquare())

const buildGrid = (nRows, nCols) =>
  [...Array(nRows)].map(_ => buildRow(nCols))

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const { width, height } = canvas.getBoundingClientRect()

const nRows = 8
const nCols = 10
const grid = buildGrid(nRows, nCols)

const widthUnit = width / nCols
const heightUnit = height / nRows

const drawCols = () => {
  for (let col = 0; col <= nCols; col++) {
    context.beginPath()
    context.moveTo(col * widthUnit, 0)
    context.lineTo(col * widthUnit, height)
    context.stroke()
  }
}

const drawRows = () => {
  for (let row = 0; row <= nRows; row++) {
    context.beginPath()
    context.moveTo(0, row * widthUnit)
    context.lineTo(width, row * widthUnit)
    context.stroke()
  }
}

drawCols()
drawRows()

console.log(`widthUnit: ${widthUnit}, heightUnit: ${heightUnit}`)
