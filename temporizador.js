const TIMER_T = document.getElementById('timer_t')

const BTN_START_T = document.getElementById('start_t')
const BTN_STOP_T = document.getElementById('stop_t')
const BTN_RESTART_T = document.getElementById('restart_t')
BTN_STOP_T.disabled = true

let t_hs
let t_min
let t_seg
let t_interval = null

t_segundos = 0

function t_startTimer() {
    const INTERVAL_T = parseInt(document.getElementById('interval_t').value)
    const HOURS_T = parseInt(document.getElementById('hs_t').value)
    const MINUTES_T = parseInt(document.getElementById('min_t').value)
    const SECONDS_T = parseInt(document.getElementById('seg_t').value)
    if (TIMER_T.textContent == `00:00:00`) {
        if(HOURS_T > 0 && MINUTES_T >= 0){
            t_hs=HOURS_T
            t_hs--
        } else {
            t_hs = HOURS_T
        }
        if(MINUTES_T > 0 && SECONDS_T == 0){
            t_min = MINUTES_T
            t_min--
            t_seg = 59
        } else {
            t_min = MINUTES_T
        }
        if(SECONDS_T > 0) {
            t_seg = SECONDS_T
            t_seg--
        } else {
            t_seg = SECONDS_T
        }
    }
    t_interval = setInterval(() => {
        if (t_hs >= 0) {
            if (t_hs <= 9) {
                if (t_min >= 0 && t_min < 10) {
                    if (t_seg <= 9) {
                        TIMER_T.textContent = `0${t_hs}:0${t_min}:0${t_seg}`
                    } else {
                        TIMER_T.textContent = `0${t_hs}:0${t_min}:${t_seg}`
                    }
                }

                if (t_min >= 10 && t_min < 60) {
                    if (t_seg <= 9) {
                        TIMER_T.textContent = `0${t_hs}:${t_min}:0${t_seg}`
                    } else {
                        TIMER_T.textContent = `0${t_hs}:${t_min}:${t_seg}`
                    }
                }
            } else {
                if (t_min >= 0 && t_min < 10) {
                    if (t_seg <= 9) {
                        TIMER_T.textContent = `${t_hs}:0${t_min}:0${t_seg}`
                    } else {
                        TIMER_T.textContent = `${t_hs}:0${t_min}:${t_seg}`
                    }
                }

                if (t_min >= 10 && t_min < 60) {
                    if (t_seg <= 9) {
                        TIMER_T.textContent = `${t_hs}:${t_min}:0${t_seg}`
                    } else {
                        TIMER_T.textContent = `${t_hs}:${t_min}:${t_seg}`
                    }
                }
            }
            t_minutos()
            // console.log(`HOLA 1`)
            // t_segundos()
            // console.log(`Temporizador: ${t_hs}:${t_min}:${t_seg}---`)
        } else {
            t_minutos()
            // t_segundos()
            // console.log(`Temporizador: ${t_hs}:${t_min}:${t_seg}---`)
            // console.log(`HOLA 2`)
        }

        function t_minutos() {
            // if (t_min == 0 && t_hs == 0) {
            //     t_min = 59
            // }

            if (t_min == 0 && t_hs > 0) {
                t_hs--
                if(t_min == 0){
                    t_min = 59
                }
                // t_min--
                console.log(t_min)
                t_segundos()
                // console.log(`HOLA 3`)
                // console.log(`Temporizador: ${t_hs}:${t_min}:${t_seg}---`)
            } else {
                // console.log(`Temporizador: ${t_hs}:${t_min}:${t_seg}`)
                t_segundos()
                // console.log(`HOLA 4`)
            }

            

            function t_segundos() {
                if(t_hs==0 && t_min == 0 && t_seg < 5){
                    console.log('_________________________________')
                    console.log(`${t_hs}-${t_min}-${t_seg}`)
                    console.log('_________________________________')
                    if(t_hs==0 && t_min ==0 && t_seg <= 2){
                        alert(`HORARIO o TEMPORIZADOR: 0${t_hs}:0${t_min}:0${t_seg}`)
                    }
                }
                if(t_hs > 0 && t_min == 0){
                    console.log(`Temporizador: ${t_hs}:${t_min}:${t_seg}____`)
                    t_min--
                    console.log(`Temporizador: ${t_hs}:${t_min}:${t_seg}____`)
                }
                if(t_min >= 0 && t_min <= 59){
                    if (t_seg == 0) {
                        console.log(`Temporizador: ${t_hs}:${t_min}:${t_seg}---`)
                        if(t_min==1){
                            alert("OJOTAZO")
                            t_min=0
                        } else if (t_min > 1 && t_min !== 59) {
                            t_min--
                            console.log(`PASANDO POR AQUI`)
                        }                        
                        t_seg = 59
                        // console.log(`HOLA 5`)
                        if (t_min > 0) {
                            // t_min--
                            // console.log(t_min)
                        } else if (t_min < 0){
                            t_min=60
                            // console.log(`HOLA 6`)
                        }
                    } else {
                        // console.log(`Temporizador: ${t_hs}:${t_min}:${t_seg}`)
                        t_seg--
                        console.log(`HOLA 7`)
                    }
                }

                if (t_hs == 0 && t_min == 0 && t_seg == 0) {
                    // console.log(`TEMPORIZADOR FINALIZADO...`)
                    // console.log(`__________________________`)
                    TIMER_T.textContent = `00:00:00`
                    alert(`HORARIO o TEMPORIZADOR: 0${t_hs}:0${t_min}:0${t_seg}`)
                    clearInterval(t_interval)
                    // TIMER_T.textContent = `00:00:00`
                    BTN_START_T.disabled = false
                    BTN_STOP_T.disabled = true
                    const H1 = document.createElement('h1')
                    H1.setAttribute('id', 'the_end')
                    const CONTAINER_T = document.getElementById('container2')
                    H1.textContent = 'La cuenta a llegado a su fin ' + t_hs + '0:' + t_min + '0:' + t_seg + '0'
                    CONTAINER_T.appendChild(H1)
                    function eliminarResultado(){
                        const CUENTA_FINAL = document.getElementById('the_end')
                        CUENTA_FINAL.remove()
                    }
                    setTimeout(eliminarResultado, 3000)
                    return
                }
            }
        }


    }, INTERVAL_T)
}

BTN_START_T.addEventListener('click', () => {
    if (BTN_START_T.disabled == false) {
        BTN_START_T.disabled = true
        BTN_STOP_T.disabled = false
        t_startTimer()
    } else {
        BTN_START_T.disabled = false
    }
})

BTN_STOP_T.addEventListener('click', () => {
    if (BTN_START_T.disabled == true) {
        BTN_START_T.disabled = false
        BTN_STOP_T.disabled = true
    }
    clearInterval(t_interval)
})

BTN_RESTART_T.addEventListener('click', () => {
    if (BTN_START_T.disabled == false && BTN_STOP_T.disabled == true) {
        TIMER_T.textContent = `00:00:00`
        t_hs = 0
        t_min = 0
        t_seg = 0
        t_segundos = 0
    } else {
        BTN_RESTART_T.disabled = true
        const CONTAINER_T = document.getElementById('container2')
        const LABEL_T = document.createElement('label')
        LABEL_T.textContent = 'Por favor deten el temporizador con el boton detener, gracias!!!'
        LABEL_T.setAttribute('id', 'wait_t')
        LABEL_T.style.color = 'white'
        CONTAINER_T.appendChild(LABEL_T)
        function t_eliminarAviso() {
            document.getElementById('wait_t').remove()
            BTN_RESTART_T.disabled = false
        }
        setTimeout(t_eliminarAviso, 3000)
    }
})