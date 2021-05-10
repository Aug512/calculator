import React, { useState, useRef } from 'react'
import Parser from '../../parser/parser'
import styles from './StringInput.module.scss'

interface IError {
  message: string
  pos: null | number
}

const StringInput = () => {

  const parse = Parser().parse

  const noErr: IError = {message: '', pos: null}
  const errPointerRef = useRef(null)

  const [exp, setExp] = useState('')
  const [res, setRes] = useState(null)
  const [err, setErr] = useState(noErr)

  const submitHandler = (e): void => {
    e.preventDefault()

    try {
      const ans = parse(exp).expAnswer
      setRes(ans)
    } catch (err) {
      const error: IError = JSON.parse(err.message)
      errPointerRef.current.style.left = `calc(${error.pos * 9}px + .25rem)`
      setErr(error)
      setRes(null)
    }
  }

  const inputChangeHandler = (evt) => {
    if (err.message) {
      setErr(noErr)
    }
    setExp(evt.target.value)
  }

  return ( 
    <div>
      <form onSubmit={submitHandler}>
        <div className={styles.formWrapper}>
          <div className={styles.inputWrapper}>
            <input type='text' className={styles.input} value={exp} onChange={inputChangeHandler} />
            <div
              className={`${styles.errPointer} ${err.pos !== null ? styles.showPointer : ''}`}
              ref={errPointerRef}
            />
          </div>
          <button type='submit' className={styles.calcBtn} title='Посчитать'>=</button>
          {err.message && <p className={styles.errDescription}>{err.message}</p>}
        </div>
      </form>
      <div className={styles.resultWrapper}>
        <p className={styles.result}>Ответ: {res}</p>
      </div>
      <ul style={{width: 'fit-content', margin: '0 auto'}}>Формальный синтаксис и ограничения:
        <li>Простые арифметические операции: <strong>a+b-c*d/e</strong></li>
        <li>Операции вычисляются <strong>в порядке указания!</strong> (нет приоритета умножения, деления, и тд)</li>
        <li>Возведение в степень: <strong>x^y</strong></li>
        <li>Факториал: <strong>x!</strong></li>
        <li>Логарифмы (без выражений в основании, без скобок в значении (без скобок внутри скобок)):
          <ul>
            <li>Логарифм от x по основанию y: <strong>logy(x)</strong></li>
            <li>Натуральный логарифм от х: <strong>ln(x)</strong></li>
            <li>Логарифм от х по оcнованию 10: <strong>lg(x)</strong></li>
            <li>Логарифм от х по оcнованию 2: <strong>lb(x)</strong></li>
          </ul>
        </li>
        <li>Константы:
          <ul>
            <li>Число Эйлера (~2,7183): <strong>e</strong></li>
            <li>Число π (~3,1416): <strong>pi</strong></li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default StringInput
