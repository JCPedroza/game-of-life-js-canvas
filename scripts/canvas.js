const { trunc } = Math

/**
 * A wrapper for the canvas API.
 */
export class Canvas {
  constructor (rows, cols, grid, canvasId = 'canvas') {
    this.grid = grid
    this.canvas = document.getElementById(canvasId)
    this.context = this.canvas.getContext('2d')
    this.canvas.onclick = this.onclick.bind(this)
    this.rows = rows
    this.cols = cols

    this.fullScreen()
    const { width, height } = this.canvas.getBoundingClientRect()

    this.cellWidth = trunc(width / cols)
    this.cellHeight = trunc(height / rows)
    this.gridWidth = this.cellWidth * cols
    this.gridHeight = this.cellHeight * rows

    this.drawGrid()
  }

  /**
   * Set the canvas to be full screen.
   */
  fullScreen () {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  /**
   * Draw a line in the canvas.
   * @param {number[]} pointA Point ([x, y] coordinates) of start of line.
   * @param {number[]} pointB Point ([x, y] coordinates) of end of line.
   * @param {number} lineWidth Line thickness.
   * @param {string} strokeStyle Line color.
   */
  drawLine (pointA, pointB, lineWidth = 1, strokeStyle = '#000') {
    this.context.strokeStyle = strokeStyle
    this.context.lineWidth = lineWidth
    this.context.beginPath()
    this.context.moveTo(...pointA)
    this.context.lineTo(...pointB)
    this.context.stroke()
  }

  /**
   * Draw a cell.
   * @param {number} row Cell row.
   * @param {number} col Cell column.
   */
  drawCell (row, col) {
    this.context.fillRect(
      col * this.cellWidth,
      row * this.cellHeight,
      this.cellWidth,
      this.cellHeight
    )
  }

  /**
   * Erase a cell.
   * @param {number} row Cell row.
   * @param {number} col Cell column.
   */
  clearCell (row, col) {
    this.context.clearRect(
      col * this.cellWidth,
      row * this.cellHeight,
      this.cellWidth,
      this.cellHeight
    )
  }

  /**
   * Draw columns (vertical lines) of grid.
   */
  drawCols () {
    for (let col = 0; col <= this.cols; col++) {
      this.drawLine(
        [col * this.cellWidth, 0],
        [col * this.cellWidth, this.gridHeight]
      )
    }
  }

  /**
   * Draw rows (horizontal lines) of grid.
   */
  drawRows () {
    for (let row = 0; row <= this.rows; row++) {
      this.drawLine(
        [0, row * this.cellHeight],
        [this.gridWidth, row * this.cellHeight]
      )
    }
  }

  /**
   * Draw all the grid.
   */
  drawGrid () {
    this.drawCols()
    this.drawRows()
  }

  onclick (event) {
    const row = trunc(event.layerY / this.cellHeight)
    const col = trunc(event.layerX / this.cellWidth)

    const cell = this.grid.toggle(row, col)
    if (cell.isOn) this.drawCell(row, col)
    else this.clearCell(row, col)
    console.log(cell)

    this.drawGrid()
  }
}

export default {
  Canvas
}
