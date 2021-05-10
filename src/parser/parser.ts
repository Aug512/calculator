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

      const closingBrackets = []
      const openingBrackets = []

      const checkBracketsBalance = () => {
        str.split('').forEach((sym: string, index: number) => {
          if (sym === ')') {
            closingBrackets.push(index)
          }
          if (sym === '(') {
            openingBrackets.push(index)
          }
        })
        if (openingBrackets.length > closingBrackets.length) {
          throw new TypeError(JSON.stringify({message: 'Нарушен баланс скобок, не хватает закрывающей', pos: 0}))
        }
        if (openingBrackets.length < closingBrackets.length) {
          throw new TypeError(JSON.stringify({message: 'Нарушен баланс скобок, не хватает открывающей', pos: 0}))
        }
      }

      const parseBrackets = (str: string, startedIndex: number): parseBracketsReturn => {
        //const closingBrackets = []
        str.split('').forEach((sym: string, index: number) => {
          if (sym === ')') closingBrackets.push(index)
          if (sym === '(') openingBrackets.push(index)
        })
        const closeBracketIndex = closingBrackets[0 + currentValue.bracketsLevel]
        return {
          val: str.slice(startedIndex + 1, closeBracketIndex).split('').filter((sym: string) => sym !== '(' && sym !== ')').join(''),
          index: closeBracketIndex
        }
      }

      const calculateLog = (basis: number, value: number): number => {
        return Math.log(value) / Math.log(basis)
      }

      const getFact = (n: number, i: number): number => {
        if (n === 0) return 1
        if (n % 1 !== 0 || n < 0) {
          throw new TypeError(JSON.stringify({message: 'Аргумент факториала должен быть неотрицательным целым числом', pos: 0}))
        } else {
          return (n === 1) ? n : n * getFact(n - 1, i)
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

      try {
        checkBracketsBalance()
        if (!str.trim()) {
          throw new TypeError(JSON.stringify({message: 'Введите выражение', pos: 0}))
        }
        for (let i = 0; i < str.length; i++) {
          let sym = str[i]
  
          if (sym === ' ') continue
  
          else if (sym === '.' || sym === ',') {
            currentValue.dotState = 10
            continue
          }
  
          else if (str[i] === 'e') {
            if (!currentValue.val) {
              currentValue.val = Math.E
            } else {
              throw new TypeError(JSON.stringify({message: 'Число Эйлера должно быть отделено операндом', pos: i + 1}))
            }
            for (let j = i + 1; j < str.length; j++) {
              if (str[j] === ' ') {
                continue
              } else if (!isNaN(parseInt(str[j]))) {
                throw new TypeError(JSON.stringify({message: 'Число Эйлера должно быть отделено операндом', pos: i + 1}))
              } else {
                break
              }
            }
          }

          else if (str.slice(i, i + 2) === 'pi') {
            if (!currentValue.val) {
              currentValue.val = Math.PI
              i++
            } else {
              throw new TypeError(JSON.stringify({message: 'Число Пи должно быть отделено операндом', pos: i + 1}))
            }
            for (let j = i + 1; j < str.length; j++) {
              if (str[j] === ' ') {
                continue
              } else if (!isNaN(parseInt(str[j]))) {
                throw new TypeError(JSON.stringify({message: 'Число Пи должно быть отделено операндом', pos: i + 1}))
              } else {
                break
              }
            }
          }
  
          else if (!isNaN(parseInt(sym, 10))) {
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
  
          else if (sym === '+') {
            operators.push('sum')
            numbers.push(currentValue.val)
            currentValue.val = 0
            currentValue.posState = 1
            currentValue.dotState = 0
          }
          else if (sym === '-' && i !== 0) {
            operators.push('dec')
            numbers.push(currentValue.val)
            currentValue.val = 0
            currentValue.posState = 1
            currentValue.dotState = 0
          }
          else if (sym === '-' && (i === 0 || str[i - 1] === '(')) {
            currentValue.posState = -1
          }
  
          else if (sym === '!' ) {
            currentValue.val = getFact(currentValue.val, i)
          }
  
          else if (sym === 'l') {
            if (str[i + 1] === 'n') {
              currentValue.logData.basis = Math.E
              i++
            } else if (str[i + 1] === 'g') {
              currentValue.logData.basis = 10
              i++
            } else if (str[i + 1] === 'b') {
              currentValue.logData.basis = 2
              i++
            } else if (str.slice(i + 1, i + 3) === 'og') {
              for (let j = i + 3; j < str.length; j++) {
                if (!isNaN(parseInt(str[j], 10)) || str[j] === '.' || str[j] === ',' || str[j] === '-') {
                  currentValue.logData.basis = currentValue.logData.basis
                    ? `${currentValue.logData.basis}${str[j]}`
                    : str[j]
                } else if (str[j] === '(' && currentValue.logData.basis !== null) {
                  i = j - 1
                  break
                } else {
                  throw new TypeError(JSON.stringify({message: 'Не указано основание логарифма', pos: j}))
                }
                if (j === str.length - 1) {
                  i += 2
                  break
                }
              }
            } else {
              throw new TypeError(JSON.stringify({message: 'Ошибка в указании логарифма', pos: i}))
            }

            if (str[i + 1] !== '(') {
              throw new TypeError(JSON.stringify({message: 'Не указано значение логарифма', pos: i + 1}))
            }
          }
  
          else if (sym === '(' && currentValue.logData.basis === null) {
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

            //if (currentValue.bracketsLevel)
  
            i = parsed.index
          }
  
          else if (sym === '(' && currentValue.logData.basis !== null) {
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
  
          else if (sym === '*') {
            operators.push('mul')
            numbers.push(currentValue.val)
            currentValue.val = 0
            currentValue.posState = 1
            currentValue.dotState = 0
          }
  
          else if (sym === '^') {
            operators.push('pow')
            numbers.push(currentValue.val)
            currentValue.val = 0
            currentValue.posState = 1
            currentValue.dotState = 0
          }
  
          else if (sym === '/') {
            operators.push('div')
            numbers.push(currentValue.val)
            currentValue.val = 0
            currentValue.posState = 1
            currentValue.dotState = 0
          }

          else if (sym !== ')') {
            throw new TypeError(JSON.stringify({message: 'Недопустимый символ', pos: i}))
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

      } catch (error) {
        throw error
      }
    }
  }
}

export default Parser
