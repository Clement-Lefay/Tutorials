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

// Complete the climbingLeaderboard function below.
function climbingLeaderboard(scores, alice) {
  // scores = array of each player scores
  // alices = scores she did at each game

  let aliceScoresToKill = [...alice]
  let leaderboard = []
  let aliceRanks = []

  for (let i = 0; i < scores.length; i++) {
    if (leaderboard.length < 1) {
      leaderboard.push({ rank: 1, score: scores[i] })
    } else {
      if (leaderboard[i - 1].score === scores[i]) {
        leaderboard.push({
          rank: leaderboard[i - 1].rank,
          score: scores[i],
        })
      } else {
        leaderboard.push({
          rank: leaderboard[i - 1].rank + 1,
          score: scores[i],
        })
      }
    }

    let isScoresToKillUpdate = false
    for (let j = aliceScoresToKill.length - 1; j >= 0; j--) {
      // console.log(`j: ${j}`)
      // console.log(`i: ${i}`)
      if (i === scores.length - 1) {
        // console.log('last item')
        if (leaderboard.length > 1 && aliceScoresToKill[j] >= leaderboard[i - 1].score) {
          // console.log('rank')
          aliceRanks.unshift(leaderboard[i - 1].rank)
        } else if (aliceScoresToKill[j] >= leaderboard[i].score) {
          // console.log('rank')
          aliceRanks.unshift(leaderboard[i].rank)
        } else if (aliceScoresToKill[j] < leaderboard[i].score) {
          aliceRanks.unshift(leaderboard[i].rank + 1)
        }
      } else {
        if (leaderboard.length > 1 && aliceScoresToKill[j] >= leaderboard[i - 1].score) {
          // console.log('rank')
          aliceRanks.unshift(leaderboard[i - 1].rank)
          isScoresToKillUpdate = true
        } else if (aliceScoresToKill[j] >= leaderboard[i].score) {
          // console.log('rank')
          aliceRanks.unshift(leaderboard[i].rank)
          isScoresToKillUpdate = true
        } else {
          // enough of high ranks, remove the extra and stop the loop - general case
          // console.log('stop')
          if (isScoresToKillUpdate) {
            aliceScoresToKill.splice(j + 1)
          }
          break
        }

        if (aliceScoresToKill.length === 1) {
          // console.log('stop at last')
          if (isScoresToKillUpdate) {
            aliceScoresToKill.splice(j)
          }
          break
        }
      }
    }
  }

  // find alice's place in this leaderboard
  /*
    for(let j = 0; j < alice.length; j++){
        const currentRank = leaderboard.find((position) => {
            return position.score <= alice[j];
        })
        console.log(currentRank)
        if(currentRank === undefined) {
          aliceRanks.push(leaderboard[leaderboard.length - 1].rank + 1)  
        } else {
            aliceRanks.push(currentRank.rank)
        }
    }
    */

  return aliceRanks
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH)

  const scoresCount = parseInt(readLine(), 10)

  const scores = readLine()
    .split(' ')
    .map((scoresTemp) => parseInt(scoresTemp, 10))

  const aliceCount = parseInt(readLine(), 10)

  const alice = readLine()
    .split(' ')
    .map((aliceTemp) => parseInt(aliceTemp, 10))

  let result = climbingLeaderboard(scores, alice)

  ws.write(result.join('\n') + '\n')

  ws.end()
}
