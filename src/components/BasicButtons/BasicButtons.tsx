import React from 'react'
import { useTypedSelector, operatorType, actionType } from '../../store/storeTypes'
import Button from '../Button/Button'
import * as actionCreator from '../../store/actionCreators'
import { ButtonVisual } from '../../types/btnTypes'
import './BasicButtons.scss'
import { useDispatch } from 'react-redux'

export class ButtonModel {
  value: string
  style: ButtonVisual
  callback: Function

  constructor(value: string, color: string, func: Function) {
    this.value = value
    this.style = color === 'light' ? ButtonVisual.light : ButtonVisual.colored
    this.callback = func
  }
}

const BasicButtons: React.FC = () => {

  const value = useTypedSelector(state => state.curValue)
  const lastOperation = useTypedSelector(state => state.operator)
  const dispatch = useDispatch()

  const checkOperations = (operation: operatorType, callback: Function) => {
    console.log('checking')
    if (lastOperation !== operation && lastOperation) {
      dispatch(actionCreator[lastOperation]())
    }
    return callback()
  }

  const calculateValue = (): actionType => {
    if (lastOperation) {
      const callback = actionCreator[lastOperation]()
      console.log(callback)
      dispatch(callback)
    }
    return actionCreator.calculate()
  }

  const checkRemove = () => {
    if (value) return actionCreator.remove()
    else return actionCreator.clear()
  }

  const BasicButtonsModel: ButtonModel[] = [
    new ButtonModel('AC', 'lighter', checkRemove),
    new ButtonModel('±', 'lighter', actionCreator.inv),
    new ButtonModel('%', 'lighter', actionCreator.perc),
    new ButtonModel('÷', 'colored', () => checkOperations('div', actionCreator.div)),
    new ButtonModel('1', 'light', () => actionCreator.setCur(1)),
    new ButtonModel('2', 'light', () => actionCreator.setCur(2)),
    new ButtonModel('3', 'light', () => actionCreator.setCur(3)),
    new ButtonModel('x', 'colored', () => checkOperations('mul', actionCreator.mul)),
    new ButtonModel('4', 'light', () => actionCreator.setCur(4)),
    new ButtonModel('5', 'light', () => actionCreator.setCur(5)),
    new ButtonModel('6', 'light', () => actionCreator.setCur(6)),
    new ButtonModel('+', 'colored', () => checkOperations('sum', actionCreator.sum)),
    new ButtonModel('7', 'light', () => actionCreator.setCur(7)),
    new ButtonModel('8', 'light', () => actionCreator.setCur(8)),
    new ButtonModel('9', 'light', () => actionCreator.setCur(9)),
    new ButtonModel('-', 'colored', () => checkOperations('dec', actionCreator.dec)),
    new ButtonModel('0', 'light', () => actionCreator.setCur(0)),
    new ButtonModel('.', 'light', actionCreator.setDot),
    new ButtonModel('=', 'colored', calculateValue),
  ]

  return (
    <div>
      <p>{value ? value : '_'}</p>
      <div className='basicButtons'>
        {BasicButtonsModel.map(button => {
          return (
            <Button key={button.value} model={button} />
          )
        })}
      </div>
    </div>
    
  )
} 

export default BasicButtons
