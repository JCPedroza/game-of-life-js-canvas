const buildSquare = (isOn = false, neighbours = 0) => ({
  isOn,
  neighbours
})

const buildRow = (len) =>
  [...Array(len)].map(_ => buildSquare())

const buildGrid = (nRows, nCols) =>
  [...Array(nRows)].map(_ => buildRow(nCols))

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const { width, height } = canvas.getBoundingClientRect()

const nRows = 4
const nCols = 6
const grid = buildGrid(nRows, nCols)

const widthUnit = Math.trunc(width / nCols)
const heightUnit = Math.trunc(height / nRows)
const gridWidth = widthUnit * nCols
const gridHeight = heightUnit * nRows

const drawCols = () => {
  for (let col = 0; col <= nCols; col++) {
    context.beginPath()
    context.moveTo(col * widthUnit, 0)
    context.lineTo(col * widthUnit, gridHeight)
    context.stroke()
  }
}

const drawRows = () => {
  for (let row = 0; row <= nRows; row++) {
    context.beginPath()
    context.moveTo(0, row * heightUnit)
    context.lineTo(gridWidth, row * heightUnit)
    context.stroke()
  }
}

const drawGrid = () => {
  drawCols()
  drawRows()
}

const initialize = () => {
  drawGrid()
  console.log(`width: ${width}, height: ${height}`)
  console.log(grid)
}

initialize()

const drawSquare = (context, row, col) =>
  context.fillRect(col * widthUnit, row * heightUnit, widthUnit, heightUnit)

const clearSquare = (context, row, col) =>
  context.clearRect(col * widthUnit, row * heightUnit, widthUnit, heightUnit)

const toggleSquare = (grid, row, col) => {
  grid[row][col].isOn = !grid[row][col].isOn
  if (grid[row][col].isOn) drawSquare(context, row, col)
  else clearSquare(context, row, col)
}

const onCanvasClick = (event) => {
  const row = Math.trunc(event.layerY / heightUnit)
  const col = Math.trunc(event.layerX / widthUnit)

  toggleSquare(grid, row, col)
  drawGrid()

  console.log(event)
  console.log(`row: ${row}, col: ${col}`)
  console.log()
}

canvas.onclick = onCanvasClick
