const horses = document.querySelectorAll(".area img")
const start = document.querySelector("#btn")
const result = document.querySelector(".result")
const finish = document.querySelector("#finish-line")

let winDisplay = document.querySelector(".win-container")
let winText = document.querySelector(".win-container h1")

let x = []
let timerId = null

function randomCount() {
  return Math.floor(Math.random() * 20)
}

for (let i = 1; i <= horses.length; i++) {
  x.push(0)
}

function run() {
  let leadingHorseIndex = 0 // Index of the leading horse

  for (let a = 0; a < horses.length; a++) {
    x[a] += randomCount() // Increment x value for each horse

    horses[a].style.left = x[a] + "px" // Move the horse horizontally

    // Check if the current horse has moved farther than the leading horse
    if (x[a] > x[leadingHorseIndex]) {
      leadingHorseIndex = a // Update the leading horse index

      // Display Leading Horse
      let leadingHorse = leadingHorseIndex + 1

      let leandingHorseName = horses[a].alt // Racer's Name

      result.textContent = `Leading Horse: Horse ${leadingHorse} (${leandingHorseName})` // Result

      if (horses[a].offsetLeft + horses[a].clientWidth >= finish.offsetLeft) {
        finished()
        winDisplay.style.display = "block"

        winText.textContent = `${leandingHorseName} Won The Race | Horse Number ${leadingHorse}`

        result.textContent = `${leandingHorseName} Won The Race | Horse Number ${leadingHorse}`
      }
    }
  }
}

// End of the race
function finished() {
  clearInterval(timerId)
  timerId = null
  start.textContent = "Again"
}

start.addEventListener("click", () => {
  if (start.textContent == "Again") {
    x = []
    for (let i = 1; i <= horses.length; i++) {
      x.push(0)
    }

    horses.forEach((h) => {
      h.style.left = "0px"
    })

    winDisplay.style.display = "none"
    start.textContent = "Start"
    result.textContent = "ARE YOU READY? HORSES ARE READY!"
  } else if (timerId == null) {
    timerId = setInterval(run, 100)
    start.textContent = "Stop"
  } else if (start.textContent == "Stop") {
    clearInterval(timerId)
    start.textContent = "Start"
    timerId = null
  }
})
