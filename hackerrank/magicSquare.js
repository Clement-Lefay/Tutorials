'use strict'

const fs = require('fs')

process.stdin.resume()
process.stdin.setEncoding('utf-8')

let inputString = ''
let currentLine = 0

process.stdin.on('data', (inputStdin) => {
  inputString += inputStdin
})

process.stdin.on('end', function () {
  inputString = inputString
    .replace(/\s*$/, '')
    .split('\n')
    .map((str) => str.replace(/\s*$/, ''))

  main()
})

function readLine() {
  return inputString[currentLine++]
}

// Complete the formingMagicSquare function below.
function formingMagicSquare(s) {
  // s = array of 3x3 numbers

  // each row, column and diagonal should be equal to 15
  // all value are unique
  console.log(s)
  function checkRow(rowIndex, matrix) {
    return 15 === matrix[rowIndex][0] + matrix[rowIndex][1] + matrix[rowIndex][2]
  }
  function checkColumn(columnIndex, matrix) {
    return 15 === matrix[0][columnIndex] + matrix[1][columnIndex] + matrix[2][columnIndex]
  }
  function checkDiagonal(isFromLeft, matrix) {
    if (isFromLeft) {
      return 15 === matrix[0][0] + matrix[1][1] + matrix[2][2]
    } else {
      return 15 === matrix[2][0] + matrix[1][1] + matrix[0][1]
    }
  }

  let possibleInt = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  let tempMatrix = [...s]
  let distinctIntList = []
  let messedUpIndex = []
  let changeCost = 0
  for (let i = 0; i < s.length; i++) {
    const rowResult = tempMatrix[i][0] + tempMatrix[i][1] + tempMatrix[i][2]

    if (!checkRow(i, tempMatrix)) {
      console.log('- row not good')
      console.log(`- row ${i} sum: ${rowResult}`)
      // if not check column
      for (let j = 0; j < s.length; j++) {
        const columnResult = tempMatrix[0][j] + tempMatrix[1][j] + tempMatrix[2][j]
        if (!checkColumn(j, tempMatrix)) {
          console.log(`-- column not good`)
          console.log(`-- column ${j} sum: ${columnResult}`)
          // so the issue is with s[i][j]
          const update = 15 - columnResult
          console.log('update: ' + update)
          changeCost += Math.abs(update)
          tempMatrix[i][j] += update
        }
      }
      // check diagonals
      if (!checkDiagonal(true, tempMatrix)) {
        console.log(`--- diagonal 1 ${tempMatrix[0][0] + tempMatrix[1][1] + tempMatrix[2][2]}`)
      }
      if (!checkDiagonal(false, tempMatrix)) {
        console.log(`--- diagonal 2: ${tempMatrix[0][2] + tempMatrix[1][1] + tempMatrix[2][0]}`)
      }
    }
    // end for
  }
  console.log(tempMatrix)
  return changeCost
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH)

  let s = Array(3)

  for (let i = 0; i < 3; i++) {
    s[i] = readLine()
      .split(' ')
      .map((sTemp) => parseInt(sTemp, 10))
  }

  const result = formingMagicSquare(s)

  ws.write(result + '\n')

  ws.end()
}
