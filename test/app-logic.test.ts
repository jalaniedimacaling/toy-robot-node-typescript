import { Direction, Movement } from '../src/app/app-enum'
import { Coordinate, Position } from '../src/app/app-interface'
import { getNewCoordinate, getNewDirection, getNewPosition, isValidCoordinate, isValidDirection, isValidPosition } from '../src/app/app-logic'

test('should be able to get a new direction', () => {
  const currentDirection = Direction.North
  const currentMovement = Movement.Left
  const direction = getNewDirection(currentDirection, currentMovement)
  expect(direction).toBe(Direction.West)
})

test('should be able to get a new coordinate', () => {
  const currentCoordinate: Coordinate = { x: 2, y: 2 }
  const currentDirection = Direction.North
  const coordinate = getNewCoordinate(currentCoordinate, currentDirection)
  expect(coordinate.x).toBe(2)
  expect(coordinate.y).toBe(3)
})

test('should be able to get a new position', () => {
  const command = 'PLACE 2,3,SOUTH'
  const position = getNewPosition(command)
  expect(position?.direction).toBe(Direction.South)
  expect(position?.coordinate.x).toBe(2)
  expect(position?.coordinate.y).toBe(3)
})

test('should be able to check if a direction is invalid', () => {
  const direction = 'EACT' as Direction
  const validDirection = isValidDirection(direction)
  expect(validDirection).toBeFalsy()
})

test('should be able to check if a direction is valid', () => {
  const direction = 'EAST' as Direction
  const validDirection = isValidDirection(direction)
  expect(validDirection).toBeTruthy()
})

test('should be able to check if a coordinate will fall off the table', () => {
  const coordinate: Coordinate = { x: -1, y: -5 }
  const validCoordinate = isValidCoordinate(coordinate)
  expect(validCoordinate).toBeFalsy()
})

test('should be able to check if a coordinate will not fall off the table', () => {
  const coordinate: Coordinate = { x: 3, y: 3 }
  const validCoordinate = isValidCoordinate(coordinate)
  expect(validCoordinate).toBeTruthy()
})

test('should be able to check if a position is invalid', () => {
  const position: Position | undefined = undefined
  const validCoordinate = isValidPosition(position)
  expect(validCoordinate).toBeFalsy()
})

test('should be able to check if a position is valid', () => {
  const position: Position | undefined = {
    direction: Direction.East,
    coordinate: {
      x: 1,
      y: 1
    }
  }
  const validCoordinate = isValidPosition(position)
  expect(validCoordinate).toBeTruthy()
})
