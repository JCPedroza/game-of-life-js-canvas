import { Grid } from './grid.js'
import { Canvas } from './canvas.js'

export class App {
  constructor (rows = 4, cols = 4) {
    this.rows = rows
    this.cols = cols
    this.grid = new Grid(rows, cols)

    this.canvas = new Canvas(rows, cols, this.grid)

    this.modal = document.getElementById('modal')
    this.close = document.getElementById('close')
    this.apply = document.getElementById('apply')
    this.form = document.getElementById('form')
    this.formRows = document.getElementById('rows')
    this.formCols = document.getElementById('cols')

    window.onclick = this.onOutsideClick.bind(this)
    this.close.onclick = this.onClose.bind(this)
    this.apply.onclick = this.onApply.bind(this)

    document.addEventListener('keypress', (event) => {
      if (event.key === 'o' || event.key === 'c') {
        if (this.modal.style.display === 'none') {
          this.modal.style.display = 'block'
        } else {
          this.modal.style.display = 'none'
        }
      }
    })
  }

  onClose () {
    this.modal.style.display = 'none'
  }

  onOutsideClick (event) {
    if (event.target === this.modal) {
      this.modal.style.display = 'none'
    }
  }

  onApply () {
    this.rows = this.formRows.value
    this.cols = this.formCols.value
    this.grid = new Grid(this.rows, this.cols)
    this.canvas = new Canvas(this.rows, this.cols, this.grid)
    this.modal.style.display = 'none'
  }
}

export default {
  App
}
