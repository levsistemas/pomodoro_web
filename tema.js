const DARKMODE = document.getElementById('darkmode')
const PRINCIPAL = document.querySelector('#principal')
const SELECT = document.getElementById('select')
const INPUT_BUTTON = document.querySelectorAll('input[type="button"]')
const INPUT_NUMBER = document.querySelectorAll('input[type="number"]')
const LABELS = document.querySelectorAll('#header label')
const STADISTICS = document.getElementById('stadistics')
const TASKS = document.getElementById('tasks')
SELECT.addEventListener('change', (event) => {
    const SELECTED_COLOR = event.target.value
    if (SELECT.value == 'yellow' || SELECT.value == 'white' || SELECT.value == 'lightblue' || SELECT.value == 'violet' || SELECT.value == 'green') {
        PRINCIPAL.style.color = SELECTED_COLOR
        STADISTICS.style.color = SELECTED_COLOR
        TASKS.style.color = SELECTED_COLOR
        INPUT_BUTTON.forEach(boton => {
            boton.style.color = 'black'
        })
        INPUT_NUMBER.forEach(caja => {
            caja.style.color = 'black'
        })
        document.getElementsByClassName('stadistic')[0].style.color = 'black'
    } else {
        if (SELECT.value == SELECTED_COLOR) {
            PRINCIPAL.style.color = SELECTED_COLOR
            STADISTICS.style.color = SELECTED_COLOR
            TASKS.style.color = SELECTED_COLOR
            INPUT_BUTTON.forEach(boton => {
                boton.style.color = SELECTED_COLOR
            })
            INPUT_NUMBER.forEach(caja => {
                caja.style.color = SELECTED_COLOR
            })
        }
    }
})
DARKMODE.addEventListener('click', () => {
    if (DARKMODE.checked == true) {
        PRINCIPAL.style.backgroundColor = 'rgb(56, 53, 53)'
        document.body.style.backgroundColor = 'rgb(56, 53, 53)'
        LABELS.forEach(label => {
            label.style.color = 'white'
        })

    } else {
        PRINCIPAL.style.backgroundColor = 'grey'
        document.body.style.backgroundColor = 'grey'
        LABELS.forEach(label => {
            label.style.color = 'black'
        })
    }
})