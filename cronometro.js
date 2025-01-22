const TIMER = document.getElementById('timer')

const BTN_START = document.getElementById('start')
const BTN_STOP = document.getElementById('stop')
const BTN_RESTART = document.getElementById('restart')
const CHK_SAVE_TASKS = document.getElementById('save_tasks') 
const CRONOMETRO = []
BTN_STOP.disabled = true

let hs
let min
let seg
let interval = null
let segundos = 0
const CRONOMETRO_ON = {
    cronometro_on:false
}

CHK_SAVE_TASKS.addEventListener('click', () => {
    if(CHK_SAVE_TASKS.checked==true){
        localStorage.getItem('CRONOMETRO')
        localStorage.getItem('FINISHED')
        localStorage.getItem('TEMPORIZADOR')
        localStorage.getItem('WORKING')
        localStorage.getItem('to_do')
    } else {
        localStorage.removeItem('CRONOMETRO')
        localStorage.removeItem('FINISHED')
        localStorage.removeItem('TEMPORIZADOR')
        localStorage.removeItem('WORKING')
        localStorage.removeItem('to_do')
    }
})

function startTimer() {
    CRONOMETRO_ON.cronometro_on = true
    console.log('cronometro original, iniciando...', CRONOMETRO_ON.cronometro_on)
    
    const INTERVAL = parseInt(document.getElementById('interval').value)
    const HOURS = parseInt(document.getElementById('hs').value)
    const MINUTES = parseInt(document.getElementById('min').value)
    const SECONDS = parseInt(document.getElementById('seg').value)
    if (TIMER.textContent == `00:00:00`) {
        hs = HOURS
        min = MINUTES
        seg = SECONDS
    }
    interval = setInterval(() => {
        console.log('Intervalo cronometro: ', interval)
        segundos++
        seg++
        if (seg >= 60) {
            seg = 0
            min++
            if (min >= 60) {
                min = 0
                hs++
            }
        }
        if (hs > 0) {
            losMinutos()
            losSegundos()
        } else {
            losMinutos()
            losSegundos()
        }

        function losMinutos() {
            if (min > 59) {
                hs++
                min = 0
            }
            losSegundos()

            if (hs <= 9) {
                if (min >= 0 && min < 10) {
                    if (seg <= 9) {
                        TIMER.textContent = `0${hs}:0${min}:0${seg}`
                    } else {
                        TIMER.textContent = `0${hs}:0${min}:${seg}`
                    }
                }

                if (min >= 10 && min < 60) {
                    if (seg <= 9) {
                        TIMER.textContent = `0${hs}:${min}:0${seg}`
                    } else {
                        TIMER.textContent = `0${hs}:${min}:${seg}`
                    }
                }
            } else {
                if (min >= 0 && min < 10) {
                    if (seg <= 9) {
                        TIMER.textContent = `${hs}:0${min}:0${seg}`
                    } else {
                        TIMER.textContent = `${hs}:0${min}:${seg}`
                    }
                }

                if (min >= 10 && min < 60) {
                    if (seg <= 9) {
                        TIMER.textContent = `${hs}:${min}:0${seg}`
                    } else {
                        TIMER.textContent = `${hs}:${min}:${seg}`
                    }
                }
            }
        }

        function losSegundos() {
            if (seg > 59) {
                seg = 0
                min++
            }
        }
    }, INTERVAL)
}

BTN_START.addEventListener('click', () => {
    if (BTN_START.disabled == false) {
        BTN_START.disabled = true
        BTN_STOP.disabled = false
        if (seg == 0 && min == 0 && hs == 0) {
            segundos++
        }
        startTimer()
    } else {
        BTN_START.disabled = false
    }
})

BTN_STOP.addEventListener('click', () => {
    if (BTN_START.disabled == true) {
        BTN_START.disabled = false
        BTN_STOP.disabled = true
    }
    CRONOMETRO.push(`${hs.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`)
    console.log(CRONOMETRO)
    localStorage.setItem('CRONOMETRO', CRONOMETRO)
    CRONOMETRO_ON.cronometro_on = false
    clearInterval(interval)
    const L = document.createElement('label')
    L.innerHTML = `CRONOMETRO: ${hs.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`
    document.getElementsByClassName('stadistic')[0].appendChild(L)
})

BTN_RESTART.addEventListener('click', () => {
    if (BTN_START.disabled == false && BTN_STOP.disabled == true) {
        TIMER.textContent = `00:00:00`
        hs = 0
        min = 0
        seg = 0
        segundos = 0
    } else {
        BTN_RESTART.disabled = true
        const CONTAINER = document.getElementById('container1')
        const LABEL = document.createElement('label')
        LABEL.textContent = 'Por favor deten el cronómetro con el boton detener, gracias!!!'
        LABEL.setAttribute('id', 'wait')
        LABEL.style.color = 'white'
        CONTAINER.appendChild(LABEL)
        function eliminarAviso() {
            document.getElementById('wait').remove()
            BTN_RESTART.disabled = false
        }
        setTimeout(eliminarAviso, 3000)
    }
})

export { startTimer, CRONOMETRO, CRONOMETRO_ON, BTN_START, BTN_STOP, BTN_RESTART, hs, min, seg }