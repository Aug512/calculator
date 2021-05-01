import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../store/storeTypes'
import { ButtonProps } from '../../types/btnTypes'
import './Button.scss'

const Button: React.FC<ButtonProps> = ({model}) => {
  
  const dispatch = useDispatch()
  const currentValue = useTypedSelector(state => state.curValue)
  const lastOperation = useTypedSelector(state => state.operator)
  const isDot = useTypedSelector(state => state.isDot)
  const [text, setText] = useState(model.value)
  const [activeStyle, setActiveStyle] = useState(false)

  const operationsToSymbols = {
    sum: '+',
    dec: '-',
    mul: 'x',
    div: '÷',
  }

  useEffect(() => {
    if (operationsToSymbols[lastOperation] === model.value) {
      setActiveStyle(true)
    } else {
      setActiveStyle(false)
    }

    if (model.value === '.' && isDot) {
      setActiveStyle(true)
    } else {
      setActiveStyle(false)
    }
  }, [lastOperation, isDot])

  useEffect(() => {
    if (model.value === 'AC') {
      if (currentValue) {
        setText('C')
      } else {
        setText('AC')
      }
    }
  }, [currentValue])

  
  
  return (
    <button className={`btn ${model.style} ${activeStyle ? 'selected' : ''}`} onClick={() => {
      const payload = model.callback()
      console.log('inside', payload)
      dispatch(payload)
      }}>
      {text}
    </button>
  )
}

export default Button
