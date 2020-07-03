const mail = require('../mail')
const lib = require('../lib')
const db = require('../db')

describe('absolue', () => {
  it('should return a positive number if input is positive', () => {
    const result = lib.absolute(1)
    expect(result).toBe(1)
  })

  it('should return a positive number if input is negative', () => {
    const result = lib.absolute(-1)
    expect(result).toBe(1)
  })

  it('should return 0 if input is 0', () => {
    const result = lib.absolute(0)
    expect(result).toBe(0)
  })
})

describe('greet', () => {
  it('should return the greeting message', () => {
    const result = lib.greet('mosh')
    // make sure the test it no too specific
    expect(result).toMatch(/mosh/)
    expect(result).toContain('mosh')
  })
})

describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies()

    // too general
    expect(result).toBeDefined()
    expect(result).not.toBeNull()

    // too specific
    expect(result[0]).toBe('USD')
    expect(result[1]).toBe('AUD')
    expect(result[2]).toBe('EUR')
    expect(result.length).toBe(3)

    // proper way
    expect(result).toContain('USD')
    expect(result).toContain('AUD')
    expect(result).toContain('EUR')

    // ideal way
    expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']))
  })
})

describe('getproduct', () => {
  it('should return the product with the given id', () => {
    const result = lib.getProduct(1)
    // doesn't work with object that can be extended
    // expect(result).toEqual({ id: 1, price: 10 })

    expect(result).toMatchObject({ id: 1, price: 10 })

    expect(result).toHaveProperty('id', 1)
  })
})

describe('registerUser', () => {
  it('should throw if user name is falsy', () => {
    // null
    // undefined
    // nan
    // ''
    // 0
    // false

    const args = [null, undefined, NaN, '', 0, false]
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a)
      }).toThrow()
    })
  })

  it('should return a user object if valid user name if passed', () => {
    const result = lib.registerUser('mosh')
    expect(result).toMatchObject({ username: 'mosh' })
    expect(result.id).toBeGreaterThan(0)
  })
})

describe('applyDiscount', () => {
  it('should apply 10% discount if customer has more than 10 points', () => {
    db.getCustomerSync = function (customerId) {
      console.log('fake reading customer')
      return { id: customerId, points: 20 }
    }

    const order = { customerId: 1, totalPrice: 10 }
    lib.applyDiscount(order)
    expect(order.totalPrice).toBe(9)
  })
})

describe('notifyCustomer', () => {
  it('should send an email to the customer', () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' })
    mail.send = jest.fn()

    lib.notifyCustomer({ customerId: 1 })

    expect(mail.send).toHaveBeenCalled()
    expect(mail.send.mock.calls[0][0]).toBe('a')
    expect(mail.send.mock.calls[0][1]).toMatch(/order/)
  })
})
