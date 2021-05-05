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
      <p>Result: {res}</p>
    </div>
  )
}

export default StringInput
