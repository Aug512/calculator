import Parser from './parser'

describe ('Parser function', () => {
  let _ = Parser()
  
  test('is correctly parse numbers', () => {
    expect(_.parse('1')).toEqual({numbers: [1], operators: [], expAnswer: 1})
    expect(_.parse('1234')).toEqual({numbers: [1234], operators: [], expAnswer: 1234})
    expect(_.parse('1.234')).toEqual({numbers: [1.234], operators: [], expAnswer: 1.234})
    expect(_.parse('e')).toEqual({numbers: [Math.E], operators: [], expAnswer: Math.E})
  })

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

  test('is correctly parse 2+ operations', () => {
    expect(_.parse('1+2+3')).toEqual({numbers: [1, 2, 3], operators: ['sum', 'sum'], expAnswer: 6})
    expect(_.parse('3-2-1')).toEqual({numbers: [3, 2, 1], operators: ['dec', 'dec'], expAnswer: 0})
    expect(_.parse('1+2-3')).toEqual({numbers: [1, 2, 3], operators: ['sum', 'dec'], expAnswer: 0})
    expect(_.parse('1*(2+3+4)')).toEqual({numbers: [1, 9], operators: ['mul'], expAnswer: 9})
    expect(_.parse('1*2+3')).toEqual({numbers: [1, 2, 3], operators: ['mul', 'sum'], expAnswer: 5})
    expect(_.parse('(1*2)-3+4')).toEqual({numbers: [2, 3, 4], operators: ['dec', 'sum'], expAnswer: 3})
    expect(_.parse('1+2+3+4')).toEqual({numbers: [1, 2, 3, 4], operators: ['sum', 'sum', 'sum'], expAnswer: 10})
    expect(_.parse('10-3+2-1')).toEqual({numbers: [10, 3, 2, 1], operators: ['dec', 'sum', 'dec'], expAnswer: 8})
    expect(_.parse('3*4*(2-1)')).toEqual({numbers: [3, 4, 1], operators: ['mul', 'mul'], expAnswer: 12})
    expect(_.parse('4/2-(2-1)')).toEqual({numbers: [4, 2, 1], operators: ['div', 'dec'], expAnswer: 1})
    expect(_.parse('4*4/(3-1)')).toEqual({numbers: [4, 4, 2], operators: ['mul', 'div'], expAnswer: 8})
  })

  test('is correctly parse floats', () => {
    expect(_.parse('1.234')).toEqual({numbers: [1.234], operators: [], expAnswer: 1.234})
    expect(_.parse('1,234')).toEqual({numbers: [1.234], operators: [], expAnswer: 1.234})
    expect(_.parse('1,2+3,4')).toEqual({numbers: [1.2, 3.4], operators: ['sum'], expAnswer: 4.6})
    expect(_.parse('1,2+3.4')).toEqual({numbers: [1.2, 3.4], operators: ['sum'], expAnswer: 4.6})
    expect(_.parse('1,5*3')).toEqual({numbers: [1.5, 3], operators: ['mul'], expAnswer: 4.5})
    expect(_.parse('4*1.25')).toEqual({numbers: [4, 1.25], operators: ['mul'], expAnswer: 5})
  })

  test('is correctly parse pows', () => {
    expect(_.parse('2^2')).toEqual({numbers: [2, 2], operators: ['pow'], expAnswer: 4})
    expect(_.parse('1^1')).toEqual({numbers: [1, 1], operators: ['pow'], expAnswer: 1})
    expect(_.parse('(-2)^2')).toEqual({numbers: [-2, 2], operators: ['pow'], expAnswer: 4})
    expect(_.parse('2^(2+3)')).toEqual({numbers: [2, 5], operators: ['pow'], expAnswer: 32})
    expect(_.parse('4^(1/2)')).toEqual({numbers: [4, 0.5], operators: ['pow'], expAnswer: 2})
  })

  test('is correctly parse logs', () => {
    expect(_.parse('log2(8)')).toEqual({numbers: [3], operators: [], expAnswer: 3})
    expect(_.parse('lb(8)')).toEqual({numbers: [3], operators: [], expAnswer: 3})
    expect(_.parse('ln(e)')).toEqual({numbers: [1], operators: [], expAnswer: 1})
    expect(_.parse('log10(10000)')).toEqual({numbers: [4], operators: [], expAnswer: 4})
    expect(_.parse('lg(10000)')).toEqual({numbers: [4], operators: [], expAnswer: 4})
    expect(_.parse('3*ln(e)+2')).toEqual({numbers: [3, 1, 2], operators: ['mul', 'sum'], expAnswer: 5})
    expect(_.parse('14/log2(16)')).toEqual({numbers: [14, 4], operators: ['div'], expAnswer: 3.5})
    expect(_.parse('(2^3)-log4(16)')).toEqual({numbers: [8, 2], operators: ['dec'], expAnswer: 6})
    expect(_.parse('log4(64)*(1.5*2)')).toEqual({numbers: [3, 3], operators: ['mul'], expAnswer: 9})
  })

  test('is correctly parse factorials', () => {
    expect(_.parse('3!')).toEqual({numbers: [6], operators: [], expAnswer: 6})
    expect(_.parse('4!+6')).toEqual({numbers: [24, 6], operators: ['sum'], expAnswer: 30})
    expect(_.parse('5!/6')).toEqual({numbers: [120, 6], operators: ['div'], expAnswer: 20})
    expect(_.parse('4!-2!')).toEqual({numbers: [24, 2], operators: ['dec'], expAnswer: 22})
    expect(_.parse('4!/(6-3)!')).toEqual({numbers: [24, 6], operators: ['div'], expAnswer: 4})
  })

  //TODO: brackets in brackets `(a+(b+c))+d`
  //      check spaces parsing `(a +( b+ c)) + d`
  //      errors indication `*a+b) - (c` 
})
