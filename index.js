/** Create failsafe objects
 * Easy to apply, hard to miss
 */
export default class OverArmour {
  constructor (failFunc = this.failFunDefault) {
    this.fail = failFunc
  }

  isAsync (fn) {
    const AsyncFunction = (async () => {}).constructor
    return fn instanceof AsyncFunction === true
  }

  // Default catch
  failFunDefault (error, func, args) {
    console.log(`
      Know this: ${func.name} failed!
      The params were: ${JSON.stringify(args)}
      The Error thrown was: ${error}
    `)
  }

  /** Make any function failsafe */
  ironclad (func, fail) {
    let ironcladFun
    if (this.isAsync(func)) {
      ironcladFun = async function () {
        try {
          await func.apply(this, arguments)
        } catch (e) {
          if (fail) {
            fail.apply(this, [e, func, arguments])
          }
        }
      }
    } else {
      ironcladFun = function () {
        try {
          func.apply(this, arguments)
        } catch (e) {
          if (fail) {
            fail.apply(this, [e, func, arguments])
          }
        }
      }
    }

    return ironcladFun
  }

  getAllMethodNames (obj) {
    let methods = []
    while (obj = Reflect.getPrototypeOf(obj)) {
      let keys = Reflect.ownKeys(obj)
      keys.forEach((k) => methods.push(k))
    }
    return methods
  }

  /** Make all methods on any Object fortified */
  fortify (bareObj) {
    const methods = this.getAllMethodNames(bareObj)
    methods.forEach((functionName) => {
      const unsafeFunction = bareObj[functionName]
      bareObj[functionName] = this.ironclad(unsafeFunction, this.fail)
    })
  }

}
