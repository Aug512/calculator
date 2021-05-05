import React, { useState } from 'react'
import Parser from '../../parser/parser'

const StringInput = () => {

  const parse = Parser().parse
  const [exp, setExp] = useState('')
  const [res, setRes] = useState(null)

  return ( 
    <div>
      <input type='text' value={exp} onChange={(e) => setExp(e.target.value)} />
      <button onClick={() => setRes(parse(exp).expAnswer)}>Calculate</button>
      <p style={{marginBottom: '3rem'}}>Result: {res}</p>
      <ul style={{width: 'fit-content', margin: '0 auto'}}>Формальный синтаксис и ограничения:
        <li>Простые арифметические операции: <strong>a+b-c*d/e</strong></li>
        <li>Операции вычисляются <strong>в порядке указания!</strong> (нет приоритета умножения, деления, и тд)</li>
        <li>Скобки (пока только 1 уровень вложенности): <strong>(a+b)-(c*d)</strong></li>
        <li>Возведение в степень: <strong>x^y</strong></li>
        <li>Факториал: <strong>x!</strong></li>
        <li>
          <ul>
            Логарифмы (пока строго вне скобок и без выражений в значении): 
            <li>Логарифм от x по основанию y: <strong>logy(x)</strong></li>
            <li>Натуральный логарифм от х: <strong>ln(x)</strong></li>
            <li>Логарифм от х по оcнованию 10: <strong>lg(x)</strong></li>
            <li>Логарифм от х по оcнованию 2: <strong>lb(x)</strong></li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default StringInput
