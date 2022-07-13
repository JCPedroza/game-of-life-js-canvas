/**
 * Create a cell that represents a location in a grid / matrix.
 * @param {boolean} isOn Is the cell alive?
 * @param {number} neighbors Number of alive neighbors.
 * @returns {Object} A cell object.
 */
const makeCell = (isOn = false, neighbors = 0) => ({
  isOn,
  neighbors
})

/**
 * Create an array of cells (a row in a matrix).
 * @param {number} len Row length (number of cells).
 * @returns {Object[]} Array of cells.
 */
const makeRow = (len) => {
  const row = []

  for (let index = 0; index < len; index++) {
    row.push(makeCell())
  }

  return row
}

/**
 * Create a matrix of cell objects.
 * @param {number} nRows Number of rows.
 * @param {number} nCols Number of columns.
 * @returns {Object[][]} A 2d array of cell objects.
 */
const makeMatrix = (nRows, nCols) => {
  const matrix = []

  for (let row = 0; row < nRows; row++) {
    matrix.push(makeRow(nCols))
  }

  return matrix
}

/**
 * Represents a grid (matrix, 2d array) whose cells can be toggled on / off
 * and keep track of number of neighbors that are 'on'.
 */
export class Grid {
  constructor (nRows, nCols) {
    this.matrix = makeMatrix(nRows, nCols)
    this.rows = nRows
    this.cols = nCols
  }

  /**
   * Toggle a specific cell on / off and update observers.
   * @param {number} row Row of the cell to toggle.
   * @param {number} col Column of the cell to toggle.
   */
  toggle (row, col) {
    this.matrix[row][col].isOn = !this.matrix[row][col].isOn
    const neighbors = this.neighborsOf(row, col)

    if (this.matrix[row][col].isOn) {
      neighbors.forEach(([row, col]) => {
        this.matrix[row][col].neighbors++
      })
    } else {
      neighbors.forEach(([row, col]) => {
        this.matrix[row][col].neighbors--
      })
    }

    return this.matrix[row][col]
  }

  neighborsOf (row, col) {
    const neighbors = [
      [row - 1, col - 1],
      [row - 1, col],
      [row - 1, col + 1],
      [row, col + 1],
      [row + 1, col + 1],
      [row + 1, col],
      [row + 1, col - 1],
      [row, col - 1]
    ]

    return neighbors.filter(([row, col]) => {
      return row >= 0 &&
        row < this.rows &&
        col >= 0 &&
        col < this.cols
    })
  }
}

export default {
  Grid
}
