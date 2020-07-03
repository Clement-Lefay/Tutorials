console.log('before')
// getUser(1, (user) => {
//   // get repositories
//   getRepositories(user.gitHubUsername, (repos) => {
//     // console.log('Repositories' + repos)
//     getCommits(repo, (commit) => {
//       // CALLBACK HELL / CHRISTMAS TREE PROBLEM
//     })
//   })
// })

// Promise base approach
// getUser(1)
//   .then((user) => getRepositories(user.gitHubUsername))
//   .then((repositories) => getCommits(repositories))
//   .then((commits) => console.log('Commit ' + commits))
//   .catch((err) => console.log('Error: ' + err.message))

// async await approach
async function displayCommits() {
  try {
    const user = await getUser(1)
    const repositories = await getRepositories(user.gitHubUsername)
    const commits = await getCommits(repositories)
    console.log(commits)
  } catch (err) {
    console.log('Error ' + err)
  }
}
displayCommits()

console.log('after')

// callback
// promise
// asyn await

function getUser(id) {
  return new Promise((resolve, reject) => {
    // kick of some asyn work
    setTimeout(() => {
      console.log('reading a user from the database...')
      resolve({
        id,
        gitHubUsername: 'clement',
      })
    }, 2000)
  })
}

function getRepositories(userName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`calling GITHub API`)
      resolve(['repo1', 'repos2', 'repo3'])
      // reject(new Error('COuld not get the repo'))
    }, 2000)
  })
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`calling GITHub API`)
      resolve(['love women', 'want a women with meeeeeee'])
    }, 2000)
  })
}

// console.log('before')
//  with named function, flattern the callback
// getUser(1, getRepositories)

// console.log('after')

// callback
// promise
// asyn await

// function displayCommits(commits) {
//   console.log(commits)
// }

// function getCommits(repositories) {
//   // console.log('Repositories' + repos)
//   getCommits(repositories, displayCommits)
// }

// function getRepositories(user) {
//   // get repositories
//   getRepositories(user.gitHubUsername, getCommits)
// }
