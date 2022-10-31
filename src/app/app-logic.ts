import { Direction, Movement } from './app-enum'
import { Coordinate, Position } from './app-interface'
import { errorNotify } from './app-notify'

/**
 * To get the new direction of the toy robot based on the direction and movement
 * 
 * @param currentDirection - The current direction of the toy robot
 * @param movement - The movement that is being entered by the user
 */
export const getNewDirection = (currentDirection: Direction, movement: Movement): Direction => {
  const directions = Object.values(Direction)
  let currentDirectionIndex = directions.indexOf(currentDirection)
  switch (movement) {
    case Movement.Left:
      currentDirectionIndex--
      break
    case Movement.Right:
      currentDirectionIndex++
      break
  }
  if (currentDirectionIndex < 0) {
    return Direction.West
  } else if (currentDirectionIndex > directions.length - 1) {
    return Direction.North
  }
  return directions[currentDirectionIndex]
}

/**
 * To get the new coordinate on where the toy robot is facing
 * 
 * @param currentCoordinate - The current coordinate of the toy robot
 * @param currentDirection - The current direction of the toy robot
 */
export const getNewCoordinate = (currentCoordinate: Coordinate, currentDirection: Direction): Coordinate => {
  let { x: newX, y: newY } = currentCoordinate
  switch (currentDirection) {
    case Direction.North:
      newY++
      break
    case Direction.East:
      newX++
      break
    case Direction.South:
      newY--
      break
    case Direction.West:
      newX--
      break
  }
  return {
    x: newX,
    y: newY
  }
}

/**
 * To get the new position of the toy robot placed
 * 
 * @param command - The command entered by the user
 */
export const getNewPosition = (command: string): Position | undefined => {
  const action = command.split(' ')
  const options = action?.length > 1 && action[1].split(',')
  if (!options || options.length < 3) {
    return
  }
  const x = parseInt(options[0])
  const y = parseInt(options[1])
  const direction = options[2] as Direction
  return {
    direction,
    coordinate: {
      x,
      y
    }
  }
}

/**
 * To check if the given position is valid or not
 * 
 * @param position - The position of the toy robot
 */
export const isValidPosition = (position?: Position) => {
  const x = position?.coordinate.x 
  const y = position?.coordinate.y
  const direction = position?.direction
  const isValid = Boolean(Number.isInteger(x) && Number.isInteger(y) && direction)
  if (!isValid && process.env.NODE_ENV !== 'test') {
    errorNotify('Invalid PLACE command format. The valid PLACE command should be "PLACE X,Y,F".')
  }
  return isValid
}

/**
 * To check if the given direction is valid or not
 * 
 * @param direction - The direction of the toy robot
 */
export const isValidDirection = (direction: Direction): boolean => {
  const directions = Object.values(Direction)
  const isValid = directions.includes(direction)
  if (!isValid && process.env.NODE_ENV !== 'test') {
    errorNotify('Invalid direction format. The valid direction should be (NORTH,EAST,SOUTH,WEST).')
  }
  return isValid
}

/**
 * To check if the given coordinate is valid or not
 * 
 * @param coordinate - The coordinate of the toy robot
 */
export const isValidCoordinate = (coordinate: Coordinate): boolean => {
  const minCoordinate: Coordinate = { x: 0, y: 0 }
  const maxCoordinate: Coordinate = { x: 5, y: 5 }
  const validX = coordinate.x >= minCoordinate.x && coordinate.x < maxCoordinate.x
  const validY = coordinate.y >= minCoordinate.y && coordinate.y < maxCoordinate.y
  if ((!validX || !validY) && process.env.NODE_ENV !== 'test') {
    errorNotify('The toy robot may fall off the table. Change the direction, movement, or coordinate of the robot.')
  }
  return validX && validY
}