interface parseBracketsReturn {
  val: string
  index: number
}

type operation = 'sum' | 'dec' | 'mul' | 'div' | 'pow'

interface parseReturn {
  numbers: number[]
  operators: operation[]
  expAnswer: number
}

interface ICurrentValue {
  val: number
  posState: 1 | -1
  dotState: number
  logData: {
    basis: null | number | string
    value: null | number
  }
  bracketsLevel: number
}

interface operationsReturn {
  sum(a: number, b: number): number,
  dec(a: number, b: number): number,
  mul(a: number, b: number): number,
  div(a: number, b: number): number,
  pow(a: number, b: number): number,
}

const Parser = () => {
  return {
    parse: (str: string): parseReturn => {
      const currentValue: ICurrentValue = {
        val: 0,
        posState: 1,
        dotState: 0,
        logData: {
          basis: null,
          value: null,
        },
        bracketsLevel: -1,
      }

      const parseBrackets = (str: string, startedIndex: number): parseBracketsReturn => {
        const closingBrackets = []
        str.split('').forEach((sym: string, index: number) => {if (sym === ')') closingBrackets.push(index)})
        const closeBracketIndex = closingBrackets[0 + currentValue.bracketsLevel]
        return {
          val: str.slice(startedIndex + 1, closeBracketIndex).split('').filter((sym: string) => sym !== '(').join(''),
          index: closeBracketIndex
        }
      }

      const calculateLog = (basis: number, value: number): number => {
        return Math.log(value) / Math.log(basis)
      }

      const getFact = (n: number): number => {
        if (n % 1 !== 0) {
          alert(`n isn't integer`)
          return -1
        } else {
          return (n === 1) ? n : n * getFact(n - 1)
        }
      }
      
      const numbers: number[] = []
      const operators: operation[] = []
      
      const operations: operationsReturn = {
        sum: (a: number, b: number) => {
          return a + b
        },
        dec: (a: number, b: number) => {
          return a - b
        },
        mul: (a: number, b: number) => {
          return a * b
        },
        div: (a: number, b: number) => {
          return b === 0 ? -Infinity : a / b
        },
        pow: (a: number, b: number) => {
          return Math.pow(a, b)
        }
      }

      const output = {
        numbers: numbers,
        operators: operators,
        expAnswer: 0,
      }

  
      for (let i = 0; i < str.length; i++) {
        let sym = str[i]

        if (sym === '.' || sym === ',') {
          currentValue.dotState = 10
          continue
        }

        if (str[i] === 'e') {
          currentValue.val = Math.E
        }

        if (!isNaN(parseInt(sym, 10))) {
          if (currentValue.dotState === 0) {
            if (currentValue.val === 0) {
              currentValue.val += parseInt(sym, 10) * currentValue.posState
            } else {
              currentValue.val = currentValue.val * 10 + parseInt(sym, 10) * currentValue.posState
            }
          } else if (currentValue.dotState === 10) {
            currentValue.val = +(`${currentValue.val}.${parseInt(sym, 10)}`)
            currentValue.dotState *= 10
          } else {
            currentValue.val = +(`${currentValue.val}${parseInt(sym, 10)}`)
            currentValue.dotState *= 10
          }
        }

        if (sym === '+') {
          operators.push('sum')
          numbers.push(currentValue.val)
          currentValue.val = 0
          currentValue.posState = 1
          currentValue.dotState = 0
        }
        if (sym === '-' && i !== 0) {
          operators.push('dec')
          numbers.push(currentValue.val)
          currentValue.val = 0
          currentValue.posState = 1
          currentValue.dotState = 0
        }
        if (sym === '-' && (i === 0 || str[i - 1] === '(')) {
          currentValue.posState = -1
        }

        if (sym === '!' ) {
          currentValue.val = getFact(currentValue.val)
        }

        if (sym === 'l') {
          if (`${str[i + 1]}${str[i + 2]}` === 'og') {
            for (let j = i + 3; j < str.length; j++) {
              if (!isNaN(parseInt(str[j], 10)) || str[j] === '.' || str[j] === ',' || str[j] === '-') {
                currentValue.logData.basis = currentValue.logData.basis
                  ? `${currentValue.logData.basis}${str[j]}`
                  : str[j]
              } else {
                i = j - 1
                break
              } 
            }
          }
          if (str[i + 1] === 'n') {
            currentValue.logData.basis = Math.E
            i++
          }
          if (str[i + 1] === 'g') {
            currentValue.logData.basis = 10
            i++
          }
          if (str[i + 1] === 'b') {
            currentValue.logData.basis = 2
            i++
          }
        }

        if (sym === '(' && currentValue.logData.basis === null) {
          currentValue.bracketsLevel += 1
          const parsed = parseBrackets(str, i)
          const val = parsed.val
          const answer = Parser().parse(val)

          if (i !== 0 && currentValue.val === 0) {
            currentValue.val = answer.expAnswer
          } 
          if (i === 0 && str.length === parsed.index + 1) {
            output.numbers = [...answer.numbers]
            output.operators = [...answer.operators]
            output.expAnswer = answer.expAnswer
          } else if (i === 0 && str.length > parsed.index) {
            currentValue.val = answer.expAnswer
          }
          if (i !== 0 && output.numbers.length === 0) {
            output.numbers.push(output.expAnswer)
          } else if (i !== 0 && output.numbers.length === 2) {
            output.numbers = [...output.numbers, answer.expAnswer]
          }

          i = parsed.index
        }

        if (sym === '(' && currentValue.logData.basis !== null) {
          currentValue.bracketsLevel += 1
          const parsed = parseBrackets(str, i)
          const val = parsed.val
          const answer = Parser().parse(val)

          currentValue.logData.value = answer.expAnswer
          const log = calculateLog(+currentValue.logData.basis, currentValue.logData.value)

          currentValue.val = log
          currentValue.logData.basis = null
          currentValue.logData.value = null

          i = parsed.index
        }

        if (sym === '*') {
          operators.push('mul')
          numbers.push(currentValue.val)
          currentValue.val = 0
          currentValue.posState = 1
          currentValue.dotState = 0
        }

        if (sym === '^') {
          operators.push('pow')
          numbers.push(currentValue.val)
          currentValue.val = 0
          currentValue.posState = 1
          currentValue.dotState = 0
        }

        if (sym === '/') {
          operators.push('div')
          numbers.push(currentValue.val)
          currentValue.val = 0
          currentValue.posState = 1
          currentValue.dotState = 0
        }

        if (i === str.length - 1) {
          numbers.push(currentValue.val)
        }
      }
  
      if (operators.length > 1) {
        const answer = operators.reduce((acc, operation, index) => {
          output.expAnswer = output.expAnswer !== 0 ? output.expAnswer : acc 
          acc = operations[operation](output.expAnswer, output.numbers[index + 1])
          output.expAnswer = acc
          return acc
        }, output.numbers[0])

        output.expAnswer = answer
      }

      if (operators.length === 1) {
        const answer = operators.reduce((acc, operation, index) => {
          output.expAnswer = output.expAnswer !== 0 ? output.expAnswer : acc 
          acc = operations[operation](output.expAnswer, output.numbers[index + 1])
          output.expAnswer = acc

          return acc
        }, numbers[0])

        output.expAnswer = answer
      }

      if (operators.length === 0 && !output.expAnswer) {
        output.expAnswer = currentValue.val
      }

      return output
    }
  }
}

export default Parser
