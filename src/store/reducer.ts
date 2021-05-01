import initialState from './initialState'
import { Istate, actionType } from './storeTypes'
import actions from './actions'

const reducer = (state = initialState, action: actionType): Istate => {
  switch (action.type) {

    case actions.setCur:
      if (state.operator && !state.prevValue) {
        return {
          ...state,
          prevValue: state.curValue,
          curValue: action.value !== '.' ? action.value! : null,
        }
      }
      if (state.isDot) {
        return {
          ...state,
          curValue: +(`${state.curValue}.${action.value}`),
          isDot: false,
        }
      }
      return {
        ...state,
        curValue: +(`${state.curValue ?? ''}${action.value}`)
      }
    case actions.sum:
      if (state.prevValue) {
        return {
          ...state,
          curValue: state.curValue + state.prevValue,
          prevValue: null,
          operator: 'sum'
        }
      }
      return {
        ...state,
        prevValue: state.curValue,
        curValue: null,
        operator: 'sum',
      }

    case actions.dec:
      if (state.prevValue) {
        return {
          ...state,
          curValue: state.prevValue - state.curValue,
          prevValue: null,
          operator: 'dec'
        }
      }
      return {
        ...state,
        prevValue: state.curValue,
        curValue: null,
        operator: 'dec',
      }

    case actions.mul:
      if (state.prevValue) {
        return {
          ...state,
          curValue: state.prevValue * state.curValue,
          prevValue: null,
          operator: 'mul'
        }
      }
      return {
        ...state,
        prevValue: state.curValue,
        curValue: null,
        operator: 'mul',
      }

    case actions.div:
      if (state.prevValue) {
        return {
          ...state,
          curValue: state.prevValue / state.curValue,
          prevValue: null,
          operator: 'div'
        }
      }
      return {
        ...state,
        prevValue: state.curValue,
        curValue: null,
        operator: 'div',
      }

    case actions.perc:
      if (state.prevValue) {
        return {
          ...state,
          curValue: (state.prevValue / 100) * state.curValue,
        }
      }
      return {
        ...state,
        curValue: state.curValue / 100,
      }

    case actions.inv:
      return {
        ...state,
        curValue: state.curValue * (-1)
      }

    case actions.setDot:
      return {
        ...state,
        isDot: true,
      }

    case actions.calculate:
      return {
        ...state,
        operator: null,
      }
    
    case actions.clear:
      return {
        ...state,
        curValue: null,
        prevValue: null,
        operator: null,
      }

    case actions.remove:
      return {
        ...state,
        curValue: +(`${state.curValue}`.slice(0, -1)),
      }

    default:
      return state
  }
}

export default reducer
