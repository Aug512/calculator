import { Istate } from './storeTypes'

const initialState: Istate = {
  mode: 'simple',
  curValue: null,
  prevValue: null,
  operator: null,
  isDot: false,
}

export default initialState
