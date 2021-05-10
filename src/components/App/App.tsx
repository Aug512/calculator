import React, {useState} from 'react'
import BasicButtons from '../BasicButtons/BasicButtons'
import StringInput from '../StringInput/StringInput'
import './App.css'

function App() {
  const [stringInputMode, setStringInputMode] = useState(false)
  return (
    <div className="App">
      <input type='checkbox' checked={stringInputMode} onChange={() => setStringInputMode(prev => !prev)}/>
      {!stringInputMode && <StringInput />}
      {stringInputMode && <BasicButtons />}
    </div>
  )
}

export default App
