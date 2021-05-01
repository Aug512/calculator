import actions from './actions'
import { actionType, numOrDot } from './storeTypes'

export const setCur = (val: numOrDot): actionType => {
  return {
    type: actions.setCur,
    value: val,
  }
}

export const sum = (): actionType => {
  return {
    type: actions.sum,
  }
}
export const dec = (): actionType => {
  return {
    type: actions.dec,
  }
}
export const mul = (): actionType => {
  return {
    type: actions.mul,
  }
}
export const div = (): actionType => {
  return {
    type: actions.div,
  }
}
export const perc = (): actionType => {
  return {
    type: actions.perc,
  }
}
export const inv = (): actionType => {
  return {
    type: actions.inv,
  }
}
export const setDot = (): actionType => {
  return {
    type: actions.setDot,
  }
}
export const calculate = (): actionType => {
  return {
    type: actions.calculate
  }
}
export const clear = (): actionType => {
  return {
    type: actions.clear
  }
}
export const remove = (): actionType => {
  return {
    type: actions.remove
  }
}
