import { OutputFileType } from "typescript"

interface parseBracketsReturn {
  val: string
  index: number
}

type operation = 'sum' | 'dec' | 'mul' | 'div'

interface parseReturn {
  numbers: number[]
  operators: operation[]
  expAnswer: number
}

interface operationsReturn {
  sum(a: number, b: number): number,
  dec(a: number, b: number): number,
  mul(a: number, b: number): number,
  div(a: number, b: number): number,
}

const Parser = () => {
  return {
    parse: (str: string): parseReturn => {
      const currentValue = {
        val: 0,
        posState: 1
      }

      const parseBrackets = (str: string, startedIndex: number): parseBracketsReturn => {
        const closeBracketIndex = str.split('').findIndex((sym: string, index: number) => sym === ')' && index > startedIndex)
        return {
          val: str.slice(startedIndex + 1, closeBracketIndex),
          index: closeBracketIndex
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
        }
      }

      const output = {
        numbers: numbers,
        operators: operators,
        expAnswer: 0,
      }

      for (let i = 0; i < str.length; i++) {
        let sym = str[i]

        if (!isNaN(parseInt(sym, 10))) {
          if (currentValue.val === 0) {
            currentValue.val += parseInt(sym, 10) * currentValue.posState
          } else {
            currentValue.val = currentValue.val * 10 + parseInt(sym, 10) * currentValue.posState
          }
        }

        if (sym === '+') {
          operators.push('sum')
          numbers.push(currentValue.val)
          currentValue.val = 0
          currentValue.posState = 1
        }
        if (sym === '-' && i !== 0) {
          operators.push('dec')
          numbers.push(currentValue.val)
          currentValue.val = 0
          currentValue.posState = 1
        }
        if (sym === '-' && (i === 0 || str[i - 1] === '(')) {
          currentValue.posState = -1
        }
        if (sym === '(') {
          const parsed = parseBrackets(str, i)
          const val = parsed.val
          const answer = Parser().parse(val)

          if (i !== 0 && currentValue.val === 0) {
            // output.numbers.push(answer.expAnswer)
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
            output.numbers = [output.expAnswer, answer.expAnswer]
          }

          i = parsed.index
        }
        if (sym === '*') {
          operators.push('mul')
          numbers.push(currentValue.val)
          currentValue.val = 0
          currentValue.posState = 1
        }

        if (sym === '/') {
          operators.push('div')
          numbers.push(currentValue.val)
          currentValue.val = 0
          currentValue.posState = 1
        }

        if (i === str.length - 1) {
          numbers.push(currentValue.val)
        }
      }
      if (operators[0]) {
        const answer = operators.reduce((acc, operation, index) => {
          if (!output.expAnswer) {
            output.expAnswer = numbers[0]
          }
          acc += operations[operation](output.expAnswer, numbers[index + 1])
          return acc
        }, 0)

        output.expAnswer = answer
      }
      if (operators.length === 0 && !output.expAnswer) {
        output.expAnswer = currentValue.val
        return output
      }
      return output   //temporary

      //return string equal to answer of input expression
    },

  }
}

export default Parser
