import { Grid } from './grid.js'
import { Canvas } from './canvas.js'

const rows = 4
const cols = 6

const grid = new Grid(rows, cols)
const canvas = new Canvas(rows, cols, grid)
