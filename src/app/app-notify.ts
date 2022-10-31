import chalk from 'chalk'
import { Position } from './app-interface'

/**
 * To notify an information message to the console
 * 
 * @param message - The message to be displayed in the console
 */
export const infoNotify = (message: string) => {
  const notifyMessage = chalk.green(message)
  console.log(notifyMessage)
}

/**
 * To notify a success message to the console
 * 
 * @param message - The message to be displayed in the console
 */
export const successNotify = (message: string) => {
  const notifyMessage = chalk.black.bgGreen(message)
  console.log(notifyMessage)
}

/**
 * To notify an error message to the console
 * 
 * @param message - The message to be displayed in the console
 */
export const errorNotify = (message: string) => {
  const notifyMessage = chalk.white.bgRed(message)
  console.log(notifyMessage)
}

/**
 * To notify the title and description of the application to the console
 */
export const titleAndDescriptionNotify = () => {
  infoNotify('TOY ROBOT CHALLENGE\n')
  infoNotify('A Node Typescript simulation of the Toy Robot Challenge.')
  infoNotify(`
    PLACE X,Y,F - Place the toy robot on the table with the position X,Y coordinate, and F (NORTH,EAST,SOUTH,WEST).
    LEFT        - Rotate the toy robot's movement 90 degrees to LEFT to replace the direction it is facing.
    RIGHT       - Rotate the toy robot's movement 90 degrees to RIGHT to replace the direction it is facing.
    MOVE        - Move the toy robot by one unit forward in the direction it is facing.
    REPORT      - Output the X,Y, and F of the toy robot.
  `)
  infoNotify('To terminate the application, press CTRL+C (Windows or Linux) or Command+C (Mac).')
  infoNotify('\nStart typing your commands on what the Robot will do below:')
}

/**
 * To notify a success output message of the application to the console
 * 
 * @param position - The position to be displayed in the console
 */
export const outputNotify = (position: Position) => {
  if (process.env.NODE_ENV === 'test') {
    return
  }
  successNotify(`Output: ${position.coordinate.x},${position.coordinate.y},${position.direction}`)
}