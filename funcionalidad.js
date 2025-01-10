//MARCAR 9hs 59min 50seg y verificar las 10hs que las marque bien

const TIMER = document.getElementById('timer')

const BTN_START = document.getElementById('start')
const BTN_STOP = document.getElementById('stop')
const BTN_RESTART = document.getElementById('restart')
BTN_STOP.disabled=true

let hs
let min
let seg
let interval = null

segundos = 0

function startTimer() {
    const HOURS = parseInt(document.getElementById('hs').value)
    const MINUTES = parseInt(document.getElementById('min').value)
    const SECONDS = parseInt(document.getElementById('seg').value)
    if (TIMER.textContent == `00:00:00`) {
        hs = HOURS
        min = MINUTES
        seg = SECONDS
    } else {
        const POSICIONES= TIMER.textContent.split(":")
        console.log(hs)
        console.log(min)
        console.log(seg)
        POSICIONES.forEach(posicion => {
            console.log(posicion)
        })
    }
    interval = setInterval(() => {
        seg++
        if(seg >= 60){
            seg=0
            min++
            if(min >= 60){
                min=0
                hs++
            }
        }
        if (hs > 0) {
            losMinutos()
            losSegundos()
            // if (min <= 9) {
            //     if (seg <= 9) {
            //         TIMER.textContent = `0${hs}:0${min}:0${seg}`
            //     } else {
            //         TIMER.textContent = `0${hs}:0${min}:${seg}`
            //     }
            // } else {
            //     if (seg <= 9) {
            //         TIMER.textContent = `0${hs}:${min}:0${seg}`
            //     } else {
            //         TIMER.textContent = `0${hs}:${min}:${seg}`
            //     }
            // }
        } else {
            losMinutos()
            losSegundos()
            // if (min <= 9) {
            //     if (seg <= 9) {
            //         TIMER.textContent = `0${hs}:0${min}:0${seg}`
            //     } else {
            //         TIMER.textContent = `0${hs}:0${min}:${seg}`
            //     }
            // } else {
            //     if (seg <= 9) {
            //         TIMER.textContent = `0${hs}:${min}:0${seg}`
            //     } else {
            //         TIMER.textContent = `0${hs}:${min}:${seg}`
            //     }
            // }
        }

        

        //MIGRAR ABAJO
        function losMinutos() {
            if (min > 59) {
                hs++
                min = 0
            }
            losSegundos()

            if(hs <= 9){
                console.log("HORAS:")
                console.log(hs)
                if (min >= 0 && min < 10) {
                    if (seg <= 9) {
                        TIMER.textContent = `0${hs}:0${min}:0${seg}`
                        TIMER.style.color = 'red'
                        TIMER.style.backgroundColor = 'violet'
                        TIMER.style.textDecoration = 'underline'
                        TIMER.style.borderRadius = '20px'
                    } else {
                        TIMER.textContent = `0${hs}:0${min}:${seg}`
                        TIMER.style.color = 'blue'
                        TIMER.style.backgroundColor = 'yellow'
                        TIMER.style.textDecoration = 'underline'
                        TIMER.style.borderRadius = '20px'
                    }
                }
    
                if (min >= 10 && min < 60) {
                    if (seg <= 9) {
                        TIMER.textContent = `0${hs}:${min}:0${seg}`
                        TIMER.style.color = 'grey'
                        TIMER.style.backgroundColor = 'pink'
                        TIMER.style.textDecoration = 'underline'
                        TIMER.style.borderRadius = '20px'
                    } else {
                        TIMER.textContent = `0${hs}:${min}:${seg}`
                        TIMER.style.color = 'cyan'
                        TIMER.style.backgroundColor = 'black'
                        TIMER.style.textDecoration = 'underline'
                        TIMER.style.borderRadius = '20px'
                    }
                }
            } else {
                console.log("HORAS:")
                console.log(hs)
                if (min >= 0 && min < 10) {
                    if (seg <= 9) {
                        TIMER.textContent = `${hs}:0${min}:0${seg}`
                        TIMER.style.color = 'red'
                        TIMER.style.backgroundColor = 'violet'
                        TIMER.style.textDecoration = 'none'
                        TIMER.style.borderRadius = '0px'
                    } else {
                        TIMER.textContent = `${hs}:0${min}:${seg}`
                        TIMER.style.color = 'blue'
                        TIMER.style.backgroundColor = 'yellow'
                        TIMER.style.textDecoration = 'none'
                        TIMER.style.borderRadius = '0px'
                    }
                }
    
                if (min >= 10 && min < 60) {
                    if (seg <= 9) {
                        TIMER.textContent = `${hs}:${min}:0${seg}`
                        TIMER.style.color = 'grey'
                        TIMER.style.backgroundColor = 'green'
                        TIMER.style.textDecoration = 'none'
                        TIMER.style.borderRadius = '0px'
                    } else {
                        TIMER.textContent = `${hs}:${min}:${seg}`
                        TIMER.style.color = 'cyan'
                        TIMER.style.backgroundColor = 'red'
                        TIMER.style.textDecoration = 'none'
                        TIMER.style.borderRadius = '0px'
                    }
                }
            }
        }
        //MIGRAR ARRIBA

        function losSegundos() {
            console.log(`HOLA ${hs}:${min}:${seg}`)
            if (seg > 59) {
                // console.log(`HOLA 22`)
                seg = 0
                min++
                // if (hs <= 9) {
                //     if (min <= 9) {
                //         TIMER.textContent = `0${hs}:0${min}:0${seg}`
                //         TIMER.style.color = 'green'
                //     } else {
                //         TIMER.textContent = `0${hs}:${min}:0${seg}`
                //         TIMER.style.color = 'yellow'
                //     }
                // } else {
                //     if (min <= 9) {
                //         TIMER.textContent = `${hs}:0${min}:0${seg}`
                //         TIMER.style.color = 'brown'

                //     } else {
                //         TIMER.textContent = `${hs}:${min}:0${seg}`
                //         TIMER.style.color = 'violet'
                //     }
                // }
            }
        }
    }, 1000)
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
    clearInterval(interval)
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
        const BODY = document.body
        const H1 = document.createElement('h1')
        H1.textContent = 'Por favor deten el contador con el boton detener, gracias!!!'
        H1.setAttribute('id', 'wait')
        H1.style.color = 'red'
        BODY.appendChild(H1)
        function eliminarAviso() {
            document.getElementById('wait').remove()
            BTN_RESTART.disabled = false
        }
        setTimeout(eliminarAviso, 3000)
    }
})