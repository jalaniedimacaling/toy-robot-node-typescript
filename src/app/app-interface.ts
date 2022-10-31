import { Direction } from './app-enum'

export interface Coordinate {
  x: number
  y: number
}

export interface Position {
  direction: Direction
  coordinate: Coordinate
}