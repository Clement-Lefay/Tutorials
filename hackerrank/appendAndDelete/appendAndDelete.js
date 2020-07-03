'use strict'

const fs = require('fs')

process.stdin.resume()
process.stdin.setEncoding('utf-8')

let inputString = ''
let currentLine = 0

process.stdin.on('data', (inputStdin) => {
  inputString += inputStdin
})

process.stdin.on('end', (_) => {
  inputString = inputString
    .replace(/\s*$/, '')
    .split('\n')
    .map((str) => str.replace(/\s*$/, ''))

  main()
})

function readLine() {
  return inputString[currentLine++]
}

// Complete the appendAndDelete function below.
function appendAndDelete(s, t, k) {
  // s = string of the 1st word
  // t = string of the 2nd word
  // k = exact amount of operation possible

  // we can erase or add from the last character
  let operationCounter = 0
  let wordS = s.split('')
  let wordT = t.split('')
  debugger
  // check if we need to remove char at the end of s
  if (wordS.length > wordT.length) {
    operationCounter += wordS.length - wordT.length
    console.log(`s too long, removing ${operationCounter} char`)
    wordS = wordS.slice(0, -operationCounter)
  }
  // deletion process
  for (let i = wordT.length - 1; i >= 0; i--) {
    console.log(`- i: ${i}`)
    // case when s is smaller than t
    if (wordS[i] === undefined) {
      // need to add something later on, so no deletion
      console.log('- s is too short, no deletion')
    } else if (wordS[i] !== wordT[i]) {
      console.log(`- different lettre from s: ${wordS[i]} and t: ${wordT[i]}`)
      // we need to delete this guyt
      const amountToRemove = wordS.length - i
      console.log(`- need to remove ${amountToRemove}`)
      wordS = wordS.slice(0, -amountToRemove)
      operationCounter += amountToRemove
    }
    // if not, goes to next
  }

  console.log(`== Ope done so far: ${operationCounter} === start index: ${wordS.length - 1}`)
  const remainingOpe = k - operationCounter
  const remainingSpace = wordT.length - wordS.length
  console.log(`Remaining opé: ${remainingOpe}`)
  console.log(`s length: ${wordS.length} == t length: ${wordT.length}`)
  debugger
  // check if we can stop here
  if (remainingOpe <= 0) {
    console.log(`too many operation: ${operationCounter} done - target ${k}`)
    return 'No'
  } else if (remainingOpe === 2 * wordT.length) {
    // number of ope remaining = 2* t.length
    console.log(`We can remove ${wordT.length} characters that will be pushed after`)
    wordS = wordS.slice(0, -wordT.length)
    operationCounter = +wordT.length
  } else if (remainingOpe > 2 * wordT.length) {
    // number of ope is highter than 2* t.length, will abuse the empty string removable
    console.log(`We remove ${wordT.length} char and ${remainingOpe - 2 * wordT.length} void character`)
    const voidRemovable = wordT.length + (remainingOpe - 2 * wordT.length)
    console.log(`void remove: ${voidRemovable}`)
    wordS = wordS.slice(0, -voidRemovable)
    operationCounter += voidRemovable
  } else if (remainingSpace % 2 === 0 && remainingOpe > remainingSpace && remainingOpe % 2 === 0) {
    // if not enough to erase all, we can maybe remove some char that we can later add
    // if this ops will still match the amount of remaining ope possible
    console.log(`We can remove ${(remainingOpe - remainingSpace) / 2} char and be sure to add them`)
    const semiRemoval = (remainingOpe - remainingSpace) / 2
    wordS = wordS.slice(0, -semiRemoval)
    operationCounter += semiRemoval
    // @TODO work on this part then
  } else if (remainingOpe - remainingSpace > 0) {
    // if we have more ope thant the word s length, we remove the extra
    const extraRemoval = remainingOpe - remainingSpace
    console.log(`we can remove extra char without remove too much => ${extraRemoval}`)
    wordS = wordS.slice(0, -extraRemoval)
    operationCounter += extraRemoval
  }

  let j = wordS.length - 1 < 0 ? 0 : wordS.length - 1

  console.log(`Will start at index: ${j}`)
  console.log(`Will have ${k - operationCounter} ope remaining`)

  // count how many addition we need
  for (j; j < wordT.length; j++) {
    console.log(`-- j: ${j}`)
    //if missing
    if (wordS[j] === undefined) {
      console.log('-- add letter')
      // if s miss letter, we add id
      wordS.push(wordT[j])
      operationCounter++
    }
    // if the char is different, it was already remove previously
  }
  console.log(wordS)
  console.log(`attempt: ${operationCounter}`)

  return operationCounter === k ? 'Yes' : 'No'
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH)

  const s = readLine()

  const t = readLine()

  const k = parseInt(readLine(), 10)

  let result = appendAndDelete(s, t, k)

  ws.write(result + '\n')

  ws.end()
}
