import { readCommand } from './app/app-command'
import { titleAndDescriptionNotify } from './app/app-notify'

/**
 * To initialize the toy robot application
 */
const initialize = () => {
  titleAndDescriptionNotify()
  readCommand()
}

initialize()