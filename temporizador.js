import { BTN_RESTART, BTN_START, BTN_STOP, CRONOMETRO, CRONOMETRO_ON, STATISTICS, hs, min, seg, myWorker, startTimer, TIMER, theCronometro } from "./cronometro.js"

const TIMER_T = document.getElementById('timer_t')
const STATISTIC_TIMER = document.getElementById('stadistic_timer')

const BTN_START_T = document.getElementById('start_t')
const BTN_STOP_T = document.getElementById('stop_t')
const BTN_RESTART_T = document.getElementById('restart_t')
const CONTAINER2 = document.getElementById('container2')
const WRITE_TASK = document.getElementById('write_task')
const BTN_ADD_TASK = document.getElementById('btn_add_task')
const TODO_TASKS = document.getElementById('ToDo_tasks')
const ALARMA = document.getElementById('alarm-sound')
const TIME_DATE = document.getElementById('time_date')
const POMODORO = 25
const TEMPORIZADOR = []
const ToDo_TASK = []
const WORKING = []
const FINISHED = []
const HIDRATE_1 = []
const HIDRATE_2 = []

let todo_tasks = 0
let arrastre = false
BTN_STOP_T.disabled = true
BTN_ADD_TASK.disabled = true

let t_hs
let t_min
let t_seg
let t_segundos = 0
let seguimiento = 0
let mins = 0
let secs = 0
let INTERVALO_T
let interval_icons = 0
let HORAS_T
let MINUTOS_T
let SEGUNDOS_T
let result
let ON
let OFF
let COFFEE
let statistics_clock_hs = 0
let statistics_clock_min = 0
let statistics_clock_seg = 0
let multi_worker = false
let worker_id = 0
let timeleft_t = 0
let ULTIMO_OBJETO_TEMPORIZADOR_INDICE
let ULTIMO_OBJETO_TEMPORIZADOR_TASK

function temporizadorStartTimer() {
    HORAS_T = parseInt(document.getElementById('hs_t').value)
    MINUTOS_T = parseInt(document.getElementById('min_t').value)
    SEGUNDOS_T = parseInt(document.getElementById('seg_t').value)

    if (TIMER_T.textContent == `00:00:00`) {
        t_hs = HORAS_T
        t_min = MINUTOS_T
        t_seg = SEGUNDOS_T
    }

    t_segundos = t_min * 60 + t_seg

    updateInterval()

    myWorker.worker.onmessage = function (e) {
        const { id, type, timeLeft, timeElapsed1, finished, stopped } = e.data
        if (type === "pomodoro") {
            if (finished) {
                console.log("Pomodoro terminado")
                theWorker()
                startTimer()
            } else if (stopped) {
                console.log("Pomodoro detenido")
            } else {
                timeleft_t = timeLeft
                mins = Math.floor(timeLeft / 60)
                secs = timeLeft % 60
                t_min = mins
                t_seg = secs
                if (!isNaN(mins) && !isNaN(secs)) {
                    TIMER_T.textContent = `${t_hs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
                    elPomodoro()
                }
            }
        }
        if (type === "statistic") {
            if (stopped) {
                console.log("Estadisticas detenido")
            } else {
                statistics_clock_hs = Math.floor(timeElapsed1 / 3600)
                statistics_clock_min = Math.floor((timeElapsed1 % 3600) / 60)
                statistics_clock_seg = timeElapsed1 % 60
                STATISTIC_TIMER.textContent = `${statistics_clock_hs.toString().padStart(2, '0')}:${statistics_clock_min.toString().padStart(2, '0')}:${statistics_clock_seg.toString().padStart(2, '0')}`
            }
        }
    }
    if (TIMER_T.textContent == `00:00:00`) {
        startPomodoro("pomodoro" + worker_id, POMODORO * 60)
    } else {
        startPomodoro("pomodoro" + worker_id, timeleft_t)
    }
    if (multi_worker == false) {
        startStatistics("statistic2")
    }
}

function updateInterval() {
    INTERVALO_T = parseInt(document.getElementById('interval_t').value)
}

BTN_START_T.addEventListener('click', () => {
    inicioPomodoro()
    CONTAINER2.removeAttribute('class')
    temporizadorStartTimer()
    desactivarCronometro()
    activarTemporizador()
    icons()
    if (document.getElementById('min_t').value == "0") {
        document.getElementById('min_t').value = 25
    }
    if (TIMER.innerHTML !== "00:00:00") {
        TIMER.innerHTML = "00:00:00"
        theCronometro()
        // BTN_STOP.click()
    }
})

BTN_RESTART_T.addEventListener('click', () => {
    if (BTN_START_T.disabled == false && BTN_STOP_T.disabled == true) {
        TIMER_T.textContent = `00:00:00`
        t_hs = 0
        t_min = 0
        t_seg = 0
        t_segundos = 0
        CONTAINER2.removeAttribute('class')
    } else {
        BTN_RESTART_T.disabled = true
        const LABEL_T = document.createElement('label')
        LABEL_T.textContent = 'Por favor deten el temporizador con el boton detener, gracias!!!'
        LABEL_T.setAttribute('id', 'wait_t')
        LABEL_T.style.color = 'white'
        CONTAINER2.appendChild(LABEL_T)
        function t_eliminarAviso() {
            document.getElementById('wait_t').remove()
            BTN_RESTART_T.disabled = false
        }
        setTimeout(t_eliminarAviso, 3000)
    }
})

WRITE_TASK.addEventListener('input', () => {
    if (WRITE_TASK.value.trim() == "") {
        BTN_ADD_TASK.disabled = true
    } else {
        BTN_ADD_TASK.disabled = false
    }
})

WRITE_TASK.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        BTN_ADD_TASK.click()
    }
})

BTN_ADD_TASK.addEventListener('click', () => {
    if (WRITE_TASK.value !== "") {
        todo_tasks++
        const DIV = document.createElement('div')
        const UNIQUE_ID = 'todo_task_' + todo_tasks
        DIV.id = UNIQUE_ID
        DIV.setAttribute('draggable', 'true')
        DIV.classList.add('cards')
        TODO_TASKS.appendChild(DIV)
        const P_INDEX = document.createElement('p')
        P_INDEX.setAttribute('id', todo_tasks)
        P_INDEX.innerHTML = todo_tasks + ")"
        DIV.appendChild(P_INDEX)
        const RECEIVED_TASK = WRITE_TASK.value
        const P = document.createElement('p')
        P.setAttribute('id', 'element_' + todo_tasks)
        P.style.width = '100%'
        P.textContent = RECEIVED_TASK
        document.getElementById('todo_task_' + todo_tasks).appendChild(P)
        const BTN1 = document.createElement('input')
        const BTN2 = document.createElement('input')
        BTN1.setAttribute('id', 'btn_delete_' + todo_tasks)
        BTN2.setAttribute('id', 'btn_edit_' + todo_tasks)
        BTN1.setAttribute('type', 'button')
        BTN2.setAttribute('type', 'button')
        BTN1.value = 'D'
        BTN2.value = 'E'
        document.getElementById('todo_task_' + todo_tasks).appendChild(BTN1)
        document.getElementById('todo_task_' + todo_tasks).appendChild(BTN2)
        ToDo_TASK.push([todo_tasks, RECEIVED_TASK])
        BTN1.addEventListener('click', () => {
            TODO_TASKS.removeChild(DIV)
            comboToDo()
        })

        DIV.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', UNIQUE_ID)
            e.target.classList.add('dragging')
        })

        localStorage.setItem('to_do', ToDo_TASK)

        const TASKS_ELEMENTS = document.querySelectorAll('.tareas')

        FINISHED.length = 0

        TASKS_ELEMENTS.forEach(element => {
            element.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging')
            })

            element.addEventListener('dragover', (e) => {
                e.preventDefault()
                if (element.childNodes[1].textContent.toLowerCase().includes('todo')) {
                    const ELEMENTO_ARRASTRADO = document.querySelector(".dragging");
                    const ELEMENTOS = [...element.querySelectorAll(".cards:not(.dragging)")];
                    let posicion = ELEMENTOS.find((elemento) => {
                        return e.clientY < elemento.getBoundingClientRect().top + elemento.offsetHeight / 2;
                    })

                    if (posicion) {
                        TODO_TASKS.insertBefore(ELEMENTO_ARRASTRADO, posicion);
                        comboToDo()
                    } else {
                        element.appendChild(ELEMENTO_ARRASTRADO);
                        comboToDo()
                    }
                }
            })

            if (element.childNodes[1].textContent.toLowerCase().includes('working') || element.childNodes[1].textContent.toLowerCase().includes('finished')) {
                element.addEventListener('drop', (e) => {
                    if (document.getElementsByClassName('hidrate').length > 0) {
                        document.body.style.position = 'relative'
                        const H1 = document.createElement('h1')
                        H1.textContent = 'AVISO: LIMPIA el mensaje de hidratación pasando el mouse por encima'
                        document.body.appendChild(H1)
                        H1.style.position = 'absolute'
                        H1.style.backgroundColor = 'blue'
                        H1.style.color = 'white'
                        H1.style.top = "50%"
                        H1.style.left = "25%"
                        H1.style.zIndex = 1
                        function deleteWarning() {
                            H1.remove()
                        }
                        setTimeout(deleteWarning, 6000)
                    } else {
                        e.preventDefault()
                        const DRAG_ELEMENT_NUMBER = e.dataTransfer.getData('text/plain')
                        const TASK_ELEMENT = document.getElementById(DRAG_ELEMENT_NUMBER)
                        element.appendChild(TASK_ELEMENT)
                        if (arrastre == false) {
                            arrastre = true
                            comboToDo()
                            comboWorking()
                            comboFinished()

                            if (element.children[0].textContent == 'Working') {
                                document.getElementById('min_t').value = POMODORO

                                if (CRONOMETRO_ON.cronometro_on == true) {
                                    BTN_STOP.click()
                                    BTN_RESTART.click()
                                    CRONOMETRO_ON.cronometro_on = false
                                }
                                pausaPomodoro()
                                BTN_START_T.click()
                                BTN_STOP.click()
                            }

                            if (element.children[0].textContent == 'Finished') {
                                arrastre = false
                            }
                        }
                    }
                })
            }
        })

        BTN2.addEventListener('click', (e) => {
            BTN2.disabled = true
            const FATHER = e.target.parentNode.childNodes[1]
            const CONTAINER = e.target.parentNode
            CONTAINER.style.position = 'relative'
            const EDIT = document.createElement('input')
            EDIT.setAttribute('type', 'text')
            EDIT.setAttribute('placeholder', 'Edita el campo')
            EDIT.style.position = 'absolute'
            EDIT.style.top = '0px'
            EDIT.style.left = CONTAINER.offsetWidth + 'px'
            e.target.parentNode.appendChild(EDIT)
            EDIT.focus()
            EDIT.addEventListener('keydown', (e) => {
                if (e.key === "Enter") {
                    if (EDIT.value !== "") {
                        const ORIGINAL_PARRAPH = P.textContent
                        FATHER.textContent = EDIT.value
                        const MODIFIED_PARRAPH = EDIT.value
                        const PARRAPH_INDEX = P_INDEX.innerHTML
                        const EDITED_TEXT = e.target.parentNode.children[1].textContent
                        EDIT.remove()
                        BTN2.disabled = false
                        CONTAINER.removeAttribute('style')

                        const ToDo_TASK = []

                        document.getElementsByClassName('stadistic')[0].childNodes.forEach((parrafo, indizado) => {
                            if (parrafo.textContent.includes('TEMPORIZADOR')) {
                                if (parrafo.textContent.includes(PARRAPH_INDEX)) {
                                    const REPLACE = parrafo.textContent.replace(ORIGINAL_PARRAPH, MODIFIED_PARRAPH)
                                    document.getElementsByClassName('stadistic')[0].childNodes[indizado].textContent = REPLACE
                                }
                            }
                        })

                        //EN ESTA LINEA DEBEMOS REALIZAR UN RECORRIDO DE TODAS LAS CARDS DE LAS TAREAS To Do
                        //PARA VOLVER A AGREGARLAS AL LOCALSTORAGE DE 'to_do' Y SOBREESCRIBIR NUEVAMENTE LOS VALORES YA QUE ESTAMOS EDITANDO UNA DE ELLAS

                        // document.getElementById('ToDo_tasks').childNodes.forEach((elemento, index) => {
                        //     if (index > 0) {
                        //         elemento.childNodes.forEach((elements, indexado) => {
                        //             if (indexado < 2) {
                        //                 ToDo_TASK.push(elements.textContent)
                        //             }
                        //         })
                        //     }
                        // })
                        // localStorage.setItem('to_do', ToDo_TASK)
                        comboToDo()

                        if (document.getElementById('working').childNodes[5]) {
                            document.getElementById('working').childNodes[5].childNodes.forEach((elemento, index) => {
                                if (index < 2) {
                                    WORKING.push(elemento.textContent)
                                }
                            })
                            localStorage.setItem('WORKING', WORKING)
                        }
                        comboWorking()
                        comboFinished()
                    } else {
                        EDIT.remove()
                        BTN2.disabled = false
                        CONTAINER.removeAttribute('style')
                    }
                } else if (e.key === 'Escape') {
                    EDIT.remove()
                    BTN2.disabled = false
                    CONTAINER.removeAttribute('style')
                }
            })
        })
    }
})

function comboToDo() {
    ToDo_TASK.length = 0
    const TODO = document.getElementById('todo')
    TODO.childNodes[3].childNodes.forEach((element, index) => {
        if (index > 0) {
            element.childNodes.forEach((elemento, index) => {
                if (index < 2) {
                    ToDo_TASK.push(elemento.textContent)
                    localStorage.removeItem('to_do')
                }
            })
        }
    })
    localStorage.setItem('to_do', ToDo_TASK)
}

function comboWorking() {
    WORKING.length = 0
    localStorage.removeItem('WORKING')
    const WORK = document.getElementById('working')
    if (WORK.childNodes[5]) {
        WORK.childNodes[5].childNodes.forEach((element, index) => {
            if (index < 2) {
                WORKING.push(element.textContent)
                localStorage.removeItem('WORKING')
            }
        })
        localStorage.setItem('WORKING', WORKING)
    }
}

function comboFinished() {
    FINISHED.length = 0
    localStorage.removeItem('FINISHED')
    const FINISH = document.getElementById('finish')

    FINISH.childNodes.forEach((element, index) => {
        if (index > 4) {
            element.childNodes.forEach((elemento, index) => {
                if (index < 2) {
                    FINISHED.push(elemento.textContent)
                    localStorage.removeItem('FINISHED')
                }
            })
        }
        localStorage.setItem('FINISHED', FINISHED)
    })
}

function theWorker() {
    Date().slice(0, 24)
    console.log(new Date().toLocaleString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }))
    TIMER_T.textContent = `${t_hs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    ALARMA.currentTime = 0
    ALARMA.play();
    document.getElementById('picar').style.display = 'none'
    document.getElementById('batman').style.display = 'none'
    document.getElementById('metal').style.display = 'none'
    activarCronometro()
    desactivarTemporizador()
    BTN_START.click()
    elCafe("./img/m_cafe.webp").then(img => {
        const CONTAINER_HIDRATE = document.getElementById('container_hidrate_' + seguimiento)
        CONTAINER_HIDRATE.appendChild(img)
        img.id = 'cafe_' + seguimiento
        if (img.style.opacity > 2) {
            img.style.opacity = 0.9
        }
        img.style.position = 'absolute'
        img.style.top = 0
        img.style.left = (document.getElementById('hidratacion_' + seguimiento).offsetWidth - img.offsetWidth - 5) + 'px'
        img.style.zIndex = 1
        cafeIntermitente()
    })
}

function cafeIntermitente() {
    function blinkOff() {
        OFF = setInterval(() => {
            result -= 0.1
            COFFEE = document.getElementById('cafe_' + seguimiento)
            if (COFFEE) {
                COFFEE.style.opacity = result
                if (COFFEE.style.opacity <= 0) {
                    result = 0
                    clearInterval(OFF)
                    blinkOn()
                }
            }
        }, 150)
    }

    function blinkOn() {
        ON = setInterval(() => {
            result += 0.1
            COFFEE = document.getElementById('cafe_' + seguimiento)
            if (COFFEE) {
                COFFEE.style.opacity = result
                if (COFFEE.style.opacity == 1) {
                    clearInterval(ON)
                    blinkOff()
                }
            }
        }, 150)
    }
    blinkOff()
}

let _icons = false

function icons() {
    interval_icons = setInterval(() => {
        if (_icons == false) {
            async function loadImages(urls) {
                const promises = urls.map((url, index) => {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.src = url;
                        img.onload = () => {
                            CONTAINER2.appendChild(img)
                            if (img.src.includes('picar')) {
                                img.setAttribute('id', 'picar')
                                img.setAttribute('alt', 'A PICAR CODIGO')
                                img.style.position = "absolute"
                                img.style.top = 0
                                img.style.left = 0
                                img.style.zIndex = 1
                            }

                            if (img.src.includes('metal')) {
                                img.setAttribute('id', 'metal')
                                img.setAttribute('alt', 'MODO METAL')
                                img.style.position = "absolute"
                                img.style.top = 0
                                img.style.left = CONTAINER2.offsetWidth - img.width + 'px'
                                img.style.zIndex = 1
                            }

                            if (img.src.includes('batman')) {
                                img.setAttribute('id', 'batman')
                                img.setAttribute('alt', 'BATMAAAAAAAAAAN')
                                img.style.position = "absolute"
                                img.style.top = CONTAINER2.offsetHeight - img.height + 'px'
                                img.style.left = 0
                                img.style.zIndex = 1
                            }
                            resolve({ url, width: img.offsetWidth, height: img.offsetHeight })
                        }
                    })
                })
                return Promise.all(promises);
            }
            const urls = ['./img/a_picar.webp', './img/m_batman.webp', './img/m_metal.webp']

            loadImages(urls).then((images) => {
                images.forEach((img, index) => {
                })
            })
            _icons = true
        }

        if (document.getElementById('picar')) {
            if (document.getElementById('picar').style.display == 'none') {
                document.getElementById('picar').style.display = 'flex'
            } else {
                document.getElementById('picar').style.display = 'none'
            }
        }

        if (document.getElementById('batman')) {
            if (document.getElementById('batman').style.display == 'none') {
                document.getElementById('batman').style.display = 'flex'
            } else {
                document.getElementById('batman').style.display = 'none'
            }
        }

        if (document.getElementById('metal')) {
            if (document.getElementById('metal').style.display == 'none') {
                document.getElementById('metal').style.display = 'flex'
            } else {
                document.getElementById('metal').style.display = 'none'
            }
        }
    }, 1000)
}

async function elCafe(url) {
    const IMG = new Image();
    IMG.src = url

    await new Promise((resolve, reject) => {
        IMG.onload = resolve
        IMG.onerror = reject
    })

    return IMG;
}

function elPomodoro() {
    if (t_min < 45 && t_min >= 10) {
        CONTAINER2.removeAttribute('class')
        CONTAINER2.classList.add('twentifive_temporizador')
    }

    if (t_min < 10 && t_min > 5) {
        CONTAINER2.removeAttribute('class')
        CONTAINER2.classList.add('ten_temporizador')
    }

    if (t_min < 5) {
        CONTAINER2.removeAttribute('class')
        CONTAINER2.classList.add('five_temporizador')
    }

    if (t_hs === 0 && t_min === 0 && t_seg === 0) {
        seguimiento++
        TIMER_T.textContent = `${t_hs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        const CONTAINER2 = document.getElementById('container2')
        const DIV = document.createElement('div')
        const H1 = document.createElement('h1')
        const H2 = document.createElement('h1')
        DIV.setAttribute('id', 'container_hidrate_' + seguimiento)
        DIV.style.width = '100%'
        DIV.style.backgroundColor = 'red'
        DIV.style.position = 'relative'
        H1.setAttribute('id', 'the_end')
        H1.textContent = 'Cuenta finalizada: ' + t_hs + '0:' + t_min + '0:' + t_seg + '0'
        H2.classList.add('hidrate')
        H2.setAttribute('id', 'hidratacion_' + seguimiento)
        H2.style.textAlign = 'center'
        H2.textContent = `¡TOMA AGUA! 😃`
        CONTAINER2.appendChild(DIV)
        CONTAINER2.appendChild(H1)
        DIV.appendChild(H2)
        clearInterval(interval_icons)

        function eliminarResultado() {
            const CUENTA_FINAL = document.getElementById('the_end')
            CUENTA_FINAL.remove()
        }
        setTimeout(eliminarResultado, 3000)

        const DIV_HIDRATE = document.getElementById('container_hidrate_' + seguimiento)
        HIDRATE_1.push(DIV_HIDRATE)
        HIDRATE_2.push(document.getElementById('hidratacion_' + seguimiento))

        DIV_HIDRATE.addEventListener('click', () => {
            const H2_HIDRATE = document.getElementById('hidratacion_' + seguimiento)
            H2_HIDRATE.remove()
            DIV_HIDRATE.remove()
        })

        DIV_HIDRATE.addEventListener('mouseover', (e) => {
            HIDRATE_1.forEach((hidratacion, index) => {
                e.target.remove()
                ALARMA.pause();
                DIV_HIDRATE.remove()
            })
            clearInterval(ON)
            clearInterval(OFF)
            CONTAINER2.removeAttribute('class')
            if (INTERVALO_T !== 1000) {
                document.getElementById('interval_t').value = 1000
            }
            deleteIcons()
        })

        TEMPORIZADOR.push(`${HORAS_T.toString().padStart(2, '0')}:${MINUTOS_T.toString().padStart(2, '0')}:${SEGUNDOS_T.toString().padStart(2, '0')}`)
        arrastre = false

        statisticsRec()
    }
}

function statisticsRec() {
    const L = document.createElement('label')

    if (document.querySelectorAll('.tareas')[1].children[document.querySelectorAll('.tareas')[1].children.length - 1].children[0]) {
        ULTIMO_OBJETO_TEMPORIZADOR_INDICE = document.querySelectorAll('.tareas')[1].children[document.querySelectorAll('.tareas')[1].children.length - 1].children[0].innerHTML
    }

    if (document.querySelectorAll('.tareas')[1].children[document.querySelectorAll('.tareas')[1].children.length - 1].children[0]) {
        ULTIMO_OBJETO_TEMPORIZADOR_TASK = document.querySelectorAll('.tareas')[1].children[document.querySelectorAll('.tareas')[1].children.length - 1].children[1].innerHTML
    }

    if (ULTIMO_OBJETO_TEMPORIZADOR_INDICE !== undefined && ULTIMO_OBJETO_TEMPORIZADOR_TASK !== undefined) {
        L.innerHTML = `${ULTIMO_OBJETO_TEMPORIZADOR_INDICE} - ${ULTIMO_OBJETO_TEMPORIZADOR_TASK} - TEMPORIZADOR: ${HORAS_T.toString().padStart(2, '0')}:${MINUTOS_T.toString().padStart(2, '0')}:${SEGUNDOS_T.toString().padStart(2, '0')}`
        STATISTICS.push(`${ULTIMO_OBJETO_TEMPORIZADOR_INDICE} - ${ULTIMO_OBJETO_TEMPORIZADOR_TASK} - TEMPORIZADOR: ${HORAS_T.toString().padStart(2, '0')}:${MINUTOS_T.toString().padStart(2, '0')}:${SEGUNDOS_T.toString().padStart(2, '0')}`)
        document.getElementsByClassName('stadistic')[0].appendChild(L)
    } else {
        document.getElementById('hs_t')
        L.innerHTML = `TEMPORIZADOR: ${document.getElementById('hs_t').value.toString().padStart(2, '0')}:${document.getElementById('min_t').value.toString().padStart(2, '0')}:${document.getElementById('seg_t').value.toString().padStart(2, '0')}`
        STATISTICS.push(`TEMPORIZADOR: ${document.getElementById('hs_t').value.toString().padStart(2, '0')}:${document.getElementById('min_t').value.toString().padStart(2, '0')}:${document.getElementById('seg_t').value.toString().padStart(2, '0')}`)
        document.getElementsByClassName('stadistic')[0].appendChild(L)
    }
    localStorage.setItem('TEMPORIZADOR', TEMPORIZADOR)
}

function desactivarCronometro() {
    BTN_START.hidden = true
    BTN_STOP.hidden = true
    BTN_RESTART.hidden = true
}

function activarCronometro() {
    BTN_START.hidden = false
    BTN_STOP.hidden = false
    BTN_RESTART.hidden = false
}

function desactivarTemporizador() {
    BTN_START_T.hidden = true
    BTN_STOP_T.hidden = true
    BTN_RESTART_T.hidden = true
}

function activarTemporizador() {
    BTN_START_T.hidden = false
    BTN_STOP_T.hidden = false
    BTN_RESTART_T.hidden = false
}

function inicioPomodoro() {
    BTN_START_T.disabled = true
    BTN_STOP_T.disabled = false
}

function pausaPomodoro() {
    BTN_START_T.disabled = false
    BTN_STOP_T.disabled = true
}

function showTimeAndDate() {
    setInterval(() => {
        let day = new Date().toLocaleString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })
        let day_toUpperCase = day.slice(0, 1).toUpperCase()
        day = day_toUpperCase + day.slice(1)
        const WORDS = day.split(' ')
        let ORIGINAL_MONTH = WORDS[3]
        let MODIFIED_MONTH = ORIGINAL_MONTH.slice(0, 1).toUpperCase() + ORIGINAL_MONTH.slice(1)
        day = day.replace(ORIGINAL_MONTH, MODIFIED_MONTH)
        TIME_DATE.textContent = day + 'hs'
    }, 1000)
}
showTimeAndDate()

function startPomodoro(id, duration) {
    myWorker.worker.postMessage({ action: "start", id, type: "pomodoro", duration, update: "interval_t", INTERVALO_T: INTERVALO_T })
}

function startStatistics(id) {
    if (multi_worker == false) {
        myWorker.worker.postMessage({ action: "start", id, type: "statistic" })
        multi_worker = true
    }
}

function stopPomodoro(id) {
    myWorker.worker.postMessage({ action: "stop", id, type: "pomodoro" })
    clearInterval(interval_icons)
}

BTN_STOP_T.addEventListener('click', () => {
    pausaPomodoro()
    stopPomodoro('pomodoro' + worker_id)
})

function deleteIcons() {
    document.getElementById('picar').style.display = 'none'
    document.getElementById('batman').style.display = 'none'
    document.getElementById('metal').style.display = 'none'
}

export { TIME_DATE, activarTemporizador, ALARMA, pausaPomodoro }