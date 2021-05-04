import Parser from './parser'

describe ('Parser function', () => {
  let _ = Parser()

  test('is correctly parse str "x+y"', () => {
    expect(_.parse('1+23')).toEqual({numbers: [1, 23], operators: ['sum'], expAnswer: 24})
    expect(_.parse('12+3')).toEqual({numbers: [12, 3], operators: ['sum'], expAnswer: 15})
    expect(_.parse('1+2')).toEqual({numbers: [1, 2], operators: ['sum'], expAnswer: 3})
    expect(_.parse('12+34')).toEqual({numbers: [12, 34], operators: ['sum'], expAnswer: 46})
    expect(_.parse('100+1')).toEqual({numbers: [100, 1], operators: ['sum'], expAnswer: 101})
    expect(_.parse('1+100')).toEqual({numbers: [1, 100], operators: ['sum'], expAnswer: 101})
  })

  test('is correctly parse str "x-y"', () => {
    expect(_.parse('12-3')).toEqual({numbers: [12, 3], operators: ['dec'], expAnswer: 9})
    expect(_.parse('1-23')).toEqual({numbers: [1, 23], operators: ['dec'], expAnswer: -22})
    expect(_.parse('12-34')).toEqual({numbers: [12, 34], operators: ['dec'], expAnswer: -22})
    expect(_.parse('123-4')).toEqual({numbers: [123, 4], operators: ['dec'], expAnswer: 119})
    expect(_.parse('4-123')).toEqual({numbers: [4, 123], operators: ['dec'], expAnswer: -119})
  })

  test('is correctly parse negative', () => {
    expect(_.parse('-1')).toEqual({numbers: [-1], operators: [], expAnswer: -1})
    expect(_.parse('-123')).toEqual({numbers: [-123], operators: [], expAnswer: -123})
    expect(_.parse('12+(-3)')).toEqual({numbers: [12, -3], operators: ['sum'], expAnswer: 9})
    expect(_.parse('12-34')).toEqual({numbers: [12, 34], operators: ['dec'], expAnswer: -22})
  })

  test('is correctly parse string "x*y"', () => {
    expect(_.parse('1*2')).toEqual({numbers: [1, 2], operators: ['mul'], expAnswer: 2})
    expect(_.parse('12*3')).toEqual({numbers: [12, 3], operators: ['mul'], expAnswer: 36})
    expect(_.parse('1*23')).toEqual({numbers: [1, 23], operators: ['mul'], expAnswer: 23})
    expect(_.parse('-1*2')).toEqual({numbers: [-1, 2], operators: ['mul'], expAnswer: -2})
    expect(_.parse('1*(-2)')).toEqual({numbers: [1, -2], operators: ['mul'], expAnswer: -2})
  })

  test('is correctly parse string "x/y"', () => {
    expect(_.parse('1/2')).toEqual({numbers: [1, 2], operators: ['div'], expAnswer: 0.5})
    expect(_.parse('6/3')).toEqual({numbers: [6, 3], operators: ['div'], expAnswer: 2})
    expect(_.parse('12/3')).toEqual({numbers: [12, 3], operators: ['div'], expAnswer: 4})
    expect(_.parse('36/12')).toEqual({numbers: [36, 12], operators: ['div'], expAnswer: 3})
    expect(_.parse('-12/3')).toEqual({numbers: [-12, 3], operators: ['div'], expAnswer: -4})
    expect(_.parse('-12/(-3)')).toEqual({numbers: [-12, -3], operators: ['div'], expAnswer: 4})
    expect(_.parse('12/(-3)')).toEqual({numbers: [12, -3], operators: ['div'], expAnswer: -4})
    expect(_.parse('12/0')).toEqual({numbers: [12, 0], operators: ['div'], expAnswer: -Infinity})
  })

  test('is correctly parse brackets', () => {
    expect(_.parse('(1*2)')).toEqual({numbers: [1, 2], operators: ['mul'], expAnswer: 2})
    expect(_.parse('(10*2)')).toEqual({numbers: [10, 2], operators: ['mul'], expAnswer: 20})
    expect(_.parse('(1*20)')).toEqual({numbers: [1, 20], operators: ['mul'], expAnswer: 20})
    expect(_.parse('(10*20)')).toEqual({numbers: [10, 20], operators: ['mul'], expAnswer: 200})

    expect(_.parse('1+(2*3)')).toEqual({numbers: [1, 6], operators: ['sum'], expAnswer: 7})
    expect(_.parse('12+(2*3)')).toEqual({numbers: [12, 6], operators: ['sum'], expAnswer: 18})
    expect(_.parse('1+(-2*3)')).toEqual({numbers: [1, -6], operators: ['sum'], expAnswer: -5})
    expect(_.parse('1*(-2*3)')).toEqual({numbers: [1, -6], operators: ['mul'], expAnswer: -6})
    expect(_.parse('(1+2)*3')).toEqual({numbers: [3, 3], operators: ['mul'], expAnswer: 9})

    expect(_.parse('(1+2)+(2*3)')).toEqual({numbers: [3, 6], operators: ['sum'], expAnswer: 9})
    expect(_.parse('(1-3)/(2-1)')).toEqual({numbers: [-2, 1], operators: ['div'], expAnswer: -2})
    expect(_.parse('(1-3)/(-1)')).toEqual({numbers: [-2, -1], operators: ['div'], expAnswer: 2})

    expect(_.parse('12/(1-1)')).toEqual({numbers: [12, 0], operators: ['div'], expAnswer: -Infinity})

  })

})
