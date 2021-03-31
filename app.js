const countdownForm = document.getElementById('countdownForm')
const inputContainerEl = document.getElementById('input-container')
const dataEl = document.getElementById('date')

const countdownEl = document.getElementById('countdown')
const countdownTitleEl = document.getElementById('countdown-title')
const timeElements = document.querySelectorAll('span')
const countdownBtn = document.getElementById('countdown-button')

const completeEl = document.getElementById('complete')
const completeTitle = document.getElementById('complete-title')
const completeInfo = document.getElementById('complete-info')
const completeBtn = document.getElementById('complete-button')

let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date
let countdownActive
let countdownStorage

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

const today = new Date().toISOString().split('T')[0]
dataEl.setAttribute('min', today)

function updateDom() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime()
        const distance = countdownValue - now
        const days = Math.floor(distance / day)
        const hours = Math.floor((distance % day) / hour)
        const minutes = Math.floor((distance % hour) / minute)
        const seconds = Math.floor((distance % minute) / second)

        inputContainerEl.hidden = true

        if (distance < 0) {
            clearInterval(countdownActive)
            countdownEl.hidden = true
            completeTitle.textContent = 'Countdown Complete!'
            completeInfo.textContent = `${countdownTitle} finished on ${today}`
            completeEl.hidden = false
        } else {
            countdownTitleEl.textContent = `${countdownTitle}`
            timeElements[0].textContent = `${days}`
            timeElements[1].textContent = `${hours}`
            timeElements[2].textContent = `${minutes}`
            timeElements[3].textContent = `${seconds}`
            completeEl.hidden = true
            countdownEl.hidden = false
        }
    }, second)
}

function updateCountdown(e) {
    e.preventDefault()
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value
    countdownStorage = {
        countdownTitle,
        countdownDate
    }
    localStorage.setItem('countdown', JSON.stringify(countdownStorage))

    if (countdownDate === '') {
        alert('Please select a date for the countdown!')
    } else {
        countdownValue = new Date(countdownDate).getTime()
        updateDom()
    }
}

function reset() {
    countdownEl.hidden = true
    completeEl.hidden = true
    inputContainerEl.hidden = false
    clearInterval(countdownActive)
    localStorage.removeItem('countdown')
    countdownTitle = ''
    countdownDate = ''
}

function restoreStateFromLocalStorage() {
    if (localStorage.getItem('countdown')) {
        inputContainerEl.hidden = true
        countdownStorage = JSON.parse(localStorage.getItem('countdown'))
        countdownTitle = countdownStorage.countdownTitle
        countdownDate = countdownStorage.countdownDate
        countdownValue = new Date(countdownDate).getTime()
        updateDom()
    }
}

countdownForm.addEventListener('submit', updateCountdown)
countdownBtn.addEventListener('click', reset)
completeBtn.addEventListener('click', reset)

restoreStateFromLocalStorage()

