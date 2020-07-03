const exercice = require('../exercise1')

describe('exercice 1', () => {
  it('should throw an error if input is not a number', () => {
    // string
    // function
    // undefined
    // boolean
    // null
    // object

    const args = ['', () => {}, undefined, true, null, {}]
    args.forEach((a) => {
      expect(() => {
        exercice.fizzBuzz(a)
      }).toThrow()
    })
  })

  it('should return FizzBuzz is the input is divisible by 3 and 5', () => {
    const result = exercice.fizzBuzz(15)
    expect(result).toBe('FizzBuzz')
  })

  it('should return Fizz if the input is only divisible by 3', () => {
    const result = exercice.fizzBuzz(3)
    expect(result).toBe('Fizz')
  })

  it('should return Buzz if the input is only divisible by 5', () => {
    const result = exercice.fizzBuzz(5)
    expect(result).toBe('Buzz')
  })

  it('should return the same input when the input is not divisible by either 3 or 5', () => {
    const result = exercice.fizzBuzz(1)
    expect(result).toEqual(1)
  })
})
