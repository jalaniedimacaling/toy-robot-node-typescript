import { executeCommand, isValidCommand, isValidFirstCommand } from '../src/app/app-command'
import { Direction } from '../src/app/app-enum'
import { Position } from '../src/app/app-interface'

let command: string
let currentPosition: Position | undefined

test('should be able to PLACE with a valid command', () => {
  command = 'PLACE 0,0,NORTH'
  currentPosition = executeCommand(command)
  expect(currentPosition?.direction).toBe(Direction.North)
  expect(currentPosition?.coordinate.x).toBe(0)
  expect(currentPosition?.coordinate.y).toBe(0)
})

test('should be able to RIGHT with a valid command', () => {
  command = 'RIGHT'
  currentPosition = executeCommand(command, currentPosition)
  expect(currentPosition?.direction).toBe(Direction.East)
  expect(currentPosition?.coordinate.x).toBe(0)
  expect(currentPosition?.coordinate.y).toBe(0)
})

test('should be able to MOVE with a valid command', () => {
  command = 'MOVE'
  currentPosition = executeCommand(command, currentPosition)
  expect(currentPosition?.direction).toBe(Direction.East)
  expect(currentPosition?.coordinate.x).toBe(1)
  expect(currentPosition?.coordinate.y).toBe(0)
})

test('should be able to LEFT with a valid command', () => {
  command = 'LEFT'
  currentPosition = executeCommand(command, currentPosition)
  expect(currentPosition?.direction).toBe(Direction.North)
  expect(currentPosition?.coordinate.x).toBe(1)
  expect(currentPosition?.coordinate.y).toBe(0)
})

test('should be able to REPORT with a valid command', () => {
  command = 'REPORT'
  currentPosition = executeCommand(command, currentPosition)
  expect(currentPosition?.direction).toBe(Direction.North)
  expect(currentPosition?.coordinate.x).toBe(1)
  expect(currentPosition?.coordinate.y).toBe(0)
})

test('should be able to PLACE again with a valid command', () => {
  command = 'PLACE 2,2,SOUTH'
  currentPosition = executeCommand(command, currentPosition)
  expect(currentPosition?.direction).toBe(Direction.South)
  expect(currentPosition?.coordinate.x).toBe(2)
  expect(currentPosition?.coordinate.y).toBe(2)
})

test('should be able to check if first command is invalid', () => {
  command = 'MOVE'
  const validFirstCommand = isValidFirstCommand(command)
  expect(validFirstCommand).toBeFalsy()
})

test('should be able to check if first command is valid', () => {
  command = 'PLACE 0,0,NORTH'
  const validFirstCommand = isValidFirstCommand(command)
  expect(validFirstCommand).toBeTruthy()
})

test('should be able to check if command is invalid', () => {
  command = 'RIGHTIES'
  const validCommand = isValidCommand(command)
  expect(validCommand).toBeFalsy()
})

test('should be able to check if command is valid', () => {
  command = 'RIGHT'
  const validCommand = isValidCommand(command)
  expect(validCommand).toBeTruthy()
})