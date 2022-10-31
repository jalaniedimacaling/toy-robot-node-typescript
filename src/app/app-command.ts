import readlineSync from 'readline-sync'
import { Command, Movement } from './app-enum'
import { Position } from './app-interface'
import { errorNotify, outputNotify } from './app-notify'
import { getNewCoordinate, getNewDirection, getNewPosition, isValidCoordinate, isValidDirection, isValidPosition } from './app-logic'

/**
 * To check if the given first command is valid or not
 * 
 * @param command - The command that is being entered by the user
 */
export const  isValidFirstCommand = (command: string) => {
  const isValid = command.startsWith(Command.Place)
  if (!isValid && process.env.NODE_ENV !== 'test') {
    errorNotify('The toy robot is not placed yet. The valid first command should be "PLACE X,Y,F"')
  }
  return isValid
}

/**
 * To check if the given command is valid or not
 * 
 * @param command - The command that is being entered by the user
 */
export const isValidCommand = (command: string) => {
  const commands = [Command.Move, Command.Report]
  const movements = Object.values(Movement)
  const isValid = command.startsWith(Command.Place) ||
    commands.includes(command as Command) ||
    movements.includes(command as Movement)
  if (!isValid && process.env.NODE_ENV !== 'test') {
    errorNotify('Invalid command format. The valid commands are (PLACE,LEFT,RIGHT,MOVE,REPORT).')
  }
  return isValid
}

/**
 * To get the command based on the input of the user
 */
export const getCommand = (): string => {
  return sanitizeCommand(readlineSync.question())
}

/**
 * To sanitize the given command using trim and upper case
 * 
 * @param command The command that is being entered by the user
 */
export const sanitizeCommand = (command: string): string => {
  return command
    .trim()
    .toUpperCase()
}

/**
 * To execute the given command based on the movements and commands allowed by the application
 * 
 * @param command - The command being entered by the user
 * @param currentPosition - The current position of the toy robot on the given command
 */
export const executeCommand = (command: string, currentPosition?: Position): Position | undefined => {
  switch (command) {
    case command.match(/^PLACE/)?.input:
      const position = getNewPosition(command)
      const validPosition = isValidPosition(position) && position
      if (validPosition && isValidDirection(position.direction) && isValidCoordinate(position.coordinate)) {
        currentPosition = position
      }
      break
    case Movement.Left:
    case Movement.Right:
      if (currentPosition) {
        currentPosition.direction = getNewDirection(
          currentPosition.direction,
          command
        )
      }
      break
    case Command.Move:
      if (currentPosition) {
        const coordinate = getNewCoordinate(
          currentPosition.coordinate,
          currentPosition.direction
        )
        if (isValidCoordinate(coordinate)) {
          currentPosition.coordinate = coordinate
        }
      }
      break
    case Command.Report:
      if (currentPosition) {
        outputNotify(currentPosition)
      }
      break
  }
  return currentPosition
}

/**
 * To read and check the given command of the user
 */
export const readCommand = () => {
  let currentPosition: Position | undefined
  let isFirstCommand = true
  do {
    const command = getCommand()
    if (isFirstCommand) {
      if (!isValidFirstCommand(command)) {
        continue
      }
    } else {
      if (!isValidCommand(command)) {
        continue
      }
    }
    currentPosition = executeCommand(command, currentPosition)
    if (currentPosition) {
      isFirstCommand = false
    }
  } while (true)
}