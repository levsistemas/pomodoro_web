const TIMER = document.getElementById('timer')
const BTN_START = document.getElementById('start')
const BTN_STOP = document.getElementById('stop')
const BTN_RESTART = document.getElementById('restart')
const CHK_SAVE_TASKS = document.getElementById('save_tasks')
const CRONOMETRO_ON = { cronometro_on: false }
const CRONOMETRO = []
const STATISTICS = []
const STATISTIC_TIMER = document.getElementById('stadistic_timer')
const CONTAINER1 = document.getElementById('container1')

let hs
let min
let seg
let interval = null
let segundos = 0
let myWorker = {
    worker: 0
}
let cronometro = false
let worker_id = 0
let id_worker = 0
let timer_c = 0

let statistics_clock_hs = 0
let statistics_clock_min = 0
let statistics_clock_seg = 0

myWorker.worker = new Worker("multi_worker.js")

BTN_STOP.disabled = true

CHK_SAVE_TASKS.addEventListener('click', () => {
    if (CHK_SAVE_TASKS.checked == true) {
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
    // console.log('cronometro original, iniciando...', CRONOMETRO_ON.cronometro_on)

    const INTERVAL = parseInt(document.getElementById('interval').value)
    const HOURS = parseInt(document.getElementById('hs').value)
    const MINUTES = parseInt(document.getElementById('min').value)
    const SECONDS = parseInt(document.getElementById('seg').value)
    if (TIMER.textContent == `00:00:00`) {
        hs = HOURS
        min = MINUTES
        seg = SECONDS
    }

    myWorker.worker.onmessage = function (e) {
        const { id, type, timeElapsed, timeElapsed1, finished, stopped } = e.data
        id_worker = id
        if (type === "cronometro") {
            if (finished) {
                console.log('Cronometro en el final')
            } else if (stopped) {
                console.log('Cronometro detenido')
            } else {
                timer_c = timeElapsed
                if (timer_c == 300) {
                    CONTAINER1.classList.add('five_temporizador')
                    const ALARMA = document.getElementById('alarm-sound')
                    ALARMA.play()
                }
                hs = Math.floor(timer_c / 3600);
                min = Math.floor((timer_c % 3600) / 60)
                seg = timer_c % 60
                TIMER.textContent = `${hs.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`
            }
        }

        if (type === "statistic") {
            statistics_clock_hs = Math.floor(timeElapsed1 / 3600)
            statistics_clock_min = Math.floor((timeElapsed1 % 3600) / 60)
            statistics_clock_seg = timeElapsed1 % 60
            STATISTIC_TIMER.textContent = `${statistics_clock_hs.toString().padStart(2, '0')}:${statistics_clock_min.toString().padStart(2, '0')}:${statistics_clock_seg.toString().padStart(2, '0')}`
        }
    }
}

BTN_START.addEventListener('click', () => {
    startButton()
    startTimer()
    startCronometro("cronometro1")
})

BTN_STOP.addEventListener('click', () => {
    pauseButton()
    stopCronometro("cronometro1")
    theCronometro()
})

CONTAINER1.addEventListener('mousemove', () => {
    if(document.getElementById('alarm-sound').currentTime!==0) {
        document.getElementById('alarm-sound').pause();
        document.getElementById('alarm-sound').currentTime=0
        CONTAINER1.removeAttribute('class')
    }
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

function startCronometro(id) {
    // console.log('intentando iniciar funcion cronometro', id)
    myWorker.worker.postMessage({ action: "start", id, type: "cronometro" })
}

function stopCronometro(id) {
    // console.log('intentando detener funcion cronometro', id)
    if (myWorker.worker) {
        // console.log(myWorker.worker)
        myWorker.worker.postMessage({ action: "stop", id, type: "cronometro" })
    }
}

function startButton() {
    BTN_START.disabled = true
    BTN_STOP.disabled = false
}

function pauseButton() {
    BTN_STOP.disabled = true
    BTN_START.disabled = false
}

function theCronometro() {
    CRONOMETRO.push(`${hs.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`)
    localStorage.setItem('CRONOMETRO', CRONOMETRO)
    CRONOMETRO_ON.cronometro_on = false
    const L = document.createElement('label')
    L.innerHTML = `CRONOMETRO: ${hs.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`
    document.getElementsByClassName('stadistic')[0].appendChild(L)
    STATISTICS.push(`CRONOMETRO: ${hs.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`)
    // console.log(STATISTICS)
}

export { startTimer, CRONOMETRO, CRONOMETRO_ON, BTN_START, BTN_STOP, BTN_RESTART, STATISTICS, hs, min, seg, myWorker }