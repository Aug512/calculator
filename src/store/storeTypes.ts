import { TypedUseSelectorHook, useSelector } from 'react-redux'
import actions from './actions'
import state from '../store/reducer'

type stateType = ReturnType<typeof state>

export const useTypedSelector: TypedUseSelectorHook<stateType> = useSelector


type modeType = 'simple' | 'extended'
export type operatorType = null | 'sum' | 'dec' | 'mul' | 'div' | 'perc'

export type numOrDot = number | '.'

export interface Istate {
  mode: modeType
  curValue: number | null
  prevValue: number | null
  operator: operatorType
  isDot: Boolean
}

export interface actionType {
  type: actions
  value?: numOrDot
}
