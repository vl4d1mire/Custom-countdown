const inputContainerEl = document.getElementById('input-container')
const buttonSubmit = document.querySelector('button')
const countdownForm = document.getElementById('countdownForm')
const titleEl = document.getElementById('title')
const dataEl = document.getElementById('date')


const countdown = document.getElementById('countdown')
const countdownTitleEl = document.getElementById('countdown-title')
const timeElements = document.querySelectorAll('ul')

let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

const today = new Date().toISOString().split('T')[0]
dataEl.setAttribute('min', today)

function updateDom(e) {
    const now = new Date().getTime()

    inputContainerEl.hidden = true
    countdown.hidden = false
    countdownTitleEl.textContent = countdownTitle
    console.log(now)
}

function updateCountdown(e) {
    e.preventDefault()
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value
    updateDom()
}

countdownForm.addEventListener('submit', updateCountdown)