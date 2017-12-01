<p align="center">
  <img src="/_art/oa2.jpg" width="300px" />
</p>

# Protect Functions and Classes from Crashes for Prod

[![npm version](https://badge.fury.io/js/over-armour.svg)](https://badge.fury.io/js/over-armour)

### Wrap an entire class in try/catch

Quickly protect an entire class from causing an exception with `fortify` method

Example:
```js
const iCanError = new CrashyApi()
const protector = new OverArmour()

// for PROD!
protector.fortify(iCanError) 

iCanError.failSauce('I will fail but not crash')
console.log('Still got here!')

const workingWithAsync = async () => {
  await iCanError.failSauceAsync('No try catches existed here!')
  console.log('Got here, too!')
}
workingWithAsync()

console.log('EOF!')
```
