import { BTN_RESTART, BTN_START, BTN_STOP, CRONOMETRO, CRONOMETRO_ON, STADISTICS, ESTADISTICAS, hs, min, seg } from "./cronometro.js"

const TIMER_T = document.getElementById('timer_t')

const BTN_START_T = document.getElementById('start_t')
const BTN_STOP_T = document.getElementById('stop_t')
const BTN_RESTART_T = document.getElementById('restart_t')
const CONTAINER2 = document.getElementById('container2')
const WRITE_TASK = document.getElementById('write_task')
const BTN_ADD_TASK = document.getElementById('btn_add_task')
const TODO_TASKS = document.getElementById('ToDo_tasks')
const TEMPORIZADOR = []
const ToDo_TASK = []
const WORKING = []
const FINISHED = []
const HIDRATE_1 = []
const HIDRATE_2 = []

let todo_tasks = 0
let arrastre = false
let pomodoro_on = false
BTN_STOP_T.disabled = true
BTN_ADD_TASK.disabled = true

let t_hs
let t_min
let t_seg
let t_interval = null
let t_segundos = 0
let seguimiento = 0

function temporizadorStartTimer() {
    const INTERVALO_T = parseInt(document.getElementById('interval_t').value)
    const HORAS_T = parseInt(document.getElementById('hs_t').value)
    const MINUTOS_T = parseInt(document.getElementById('min_t').value)
    const SEGUNDOS_T = parseInt(document.getElementById('seg_t').value)

    if (TIMER_T.textContent == `00:00:00`) {
        t_hs = HORAS_T
        t_min = MINUTOS_T
        t_seg = SEGUNDOS_T
    }
    t_interval = setInterval(() => {
        console.log('Intervalo temporizador: ', t_interval)
        pomodoro_on = true
        if (t_min < 45 && t_min >= 10) {
            CONTAINER2.removeAttribute('class')
            CONTAINER2.classList.add('inicio_temporizador')
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
            clearInterval(t_interval)
            pomodoro_on = false
            BTN_START_T.disabled = false
            BTN_STOP_T.disabled = true
            const CONTAINER2 = document.getElementById('container2')
            const DIV = document.createElement('div')
            const H1 = document.createElement('h1')
            const H2 = document.createElement('h1')
            DIV.setAttribute('id', 'container_hidrate_' + seguimiento)
            DIV.style.width = '100%'
            DIV.style.backgroundColor = 'red'
            H1.setAttribute('id', 'the_end')
            H1.textContent = 'Cuenta finalizada: ' + t_hs + '0:' + t_min + '0:' + t_seg + '0'
            H2.classList.add('hidrate')
            H2.setAttribute('id', 'hidratacion_' + seguimiento)
            H2.style.textAlign = 'center'
            H2.textContent = `¡TOMA AGUA! 😃`
            CONTAINER2.appendChild(DIV)
            CONTAINER2.appendChild(H1)
            DIV.appendChild(H2)
            function eliminarResultado() {
                const CUENTA_FINAL = document.getElementById('the_end')
                CUENTA_FINAL.remove()
            }
            setTimeout(eliminarResultado, 3000)

            const DIV_HIDRATE = document.getElementById('container_hidrate_' + seguimiento)
            HIDRATE_1.push(DIV_HIDRATE)
            HIDRATE_2.push(document.getElementById('hidratacion_' + seguimiento))
            // console.log(HIDRATE_1)
            // console.log(HIDRATE_2)

            DIV_HIDRATE.addEventListener('click', () => {
                const H2_HIDRATE = document.getElementById('hidratacion_' + seguimiento)
                H2_HIDRATE.remove()
                DIV_HIDRATE.remove()
            })

            DIV_HIDRATE.addEventListener('mouseover', (e) => {
                HIDRATE_1.forEach((hidratacion, index) => {
                    e.target.remove()
                })
            })

            console.log('inicio cronometro', CRONOMETRO_ON.cronometro_on)
            TEMPORIZADOR.push(`${HORAS_T.toString().padStart(2, '0')}:${MINUTOS_T.toString().padStart(2, '0')}:${SEGUNDOS_T.toString().padStart(2, '0')}`)
            // TEMPORIZADOR.forEach((marcador, index) => {
            //     console.log('Temporizador: ', marcador + '\n' + 'Indice: ', index)
            // })
            arrastre = false

            const ULTIMO_OBJETO_TEMPORIZADOR_INDICE = document.querySelectorAll('.tareas')[1].children[document.querySelectorAll('.tareas')[1].children.length - 1].children[0].innerHTML
            const ULTIMO_OBJETO_TEMPORIZADOR_TASK = document.querySelectorAll('.tareas')[1].children[document.querySelectorAll('.tareas')[1].children.length - 1].children[1].innerHTML
            const L = document.createElement('label')
            L.innerHTML = `${ULTIMO_OBJETO_TEMPORIZADOR_INDICE} - ${ULTIMO_OBJETO_TEMPORIZADOR_TASK} - TEMPORIZADOR: ${HORAS_T.toString().padStart(2, '0')}:${MINUTOS_T.toString().padStart(2, '0')}:${SEGUNDOS_T.toString().padStart(2, '0')}`
            STADISTICS.push(`${ULTIMO_OBJETO_TEMPORIZADOR_INDICE} - ${ULTIMO_OBJETO_TEMPORIZADOR_TASK} - TEMPORIZADOR: ${HORAS_T.toString().padStart(2, '0')}:${MINUTOS_T.toString().padStart(2, '0')}:${SEGUNDOS_T.toString().padStart(2, '0')}`)
            // console.log(ESTADISTICAS(`${ULTIMO_OBJETO_TEMPORIZADOR_INDICE} - ${ULTIMO_OBJETO_TEMPORIZADOR_TASK} - TEMPORIZADOR: ${HORAS_T.toString().padStart(2, '0')}:${MINUTOS_T.toString().padStart(2, '0')}:${SEGUNDOS_T.toString().padStart(2, '0')}`))
            document.getElementsByClassName('stadistic')[0].appendChild(L)
            console.log(STADISTICS)
            // console.log(ESTADISTICAS)
            localStorage.setItem('TEMPORIZADOR', TEMPORIZADOR)

            BTN_START.click()
        } else {
            if (t_seg === 0) {
                t_seg = 59
                if (t_min === 0) {
                    t_min = 59
                    if (t_hs > 0) {
                        t_hs--
                    }
                } else {
                    t_min--
                }
            } else {
                t_seg--
            }
        }

        const HHMMSS = `${t_hs.toString().padStart(2, '0')}:${t_min.toString().padStart(2, '0')}:${t_seg.toString().padStart(2, '0')}`
        TIMER_T.textContent = `${HHMMSS}`
    }, INTERVALO_T)
}

BTN_START_T.addEventListener('click', () => {
    CONTAINER2.removeAttribute('class')
    if (BTN_START_T.disabled == false) {
        BTN_START_T.disabled = true
        BTN_STOP_T.disabled = false
        temporizadorStartTimer()
    } else {
        BTN_START_T.disabled = false
        pomodoro_on = true
    }
})

BTN_STOP_T.addEventListener('click', () => {
    if (BTN_START_T.disabled == true) {
        BTN_START_T.disabled = false
        BTN_STOP_T.disabled = true
    }
    clearInterval(t_interval)
    pomodoro_on = false
})

BTN_RESTART_T.addEventListener('click', () => {
    if (BTN_START_T.disabled == false && BTN_STOP_T.disabled == true) {
        TIMER_T.textContent = `00:00:00`
        t_hs = 0
        t_min = 0
        t_seg = 0
        t_segundos = 0
        CONTAINER2.removeAttribute('class')
        pomodoro_on = false
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

        TASKS_ELEMENTS.forEach((element, index) => {
            element.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging')
            })

            element.addEventListener('dragover', (e) => {
                e.preventDefault()
                if(element.childNodes[1].textContent.toLowerCase().includes('todo')){
                    const ELEMENTO_ARRASTRADO = document.querySelector(".dragging");
                    const ELEMENTOS = [...element.querySelectorAll(".cards:not(.dragging)")];
                    let posicion = ELEMENTOS.find((elemento) => {
                        return e.clientY < elemento.getBoundingClientRect().top + elemento.offsetHeight / 2;
                    })
    
                    if(posicion){
                        TODO_TASKS.insertBefore(ELEMENTO_ARRASTRADO, posicion);
                        comboToDo()
                    } else {
                        element.appendChild(ELEMENTO_ARRASTRADO);
                        comboToDo()
                    }
                }
            })

            if(element.childNodes[1].textContent.toLowerCase().includes('working') || element.childNodes[1].textContent.toLowerCase().includes('finished')){
                // console.log(element.childNodes[1].textContent.toLowerCase())
                element.addEventListener('drop', (e) => {
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
                            document.getElementById('min_t').value = 25
                            pomodoro_on = true
    
                            if (CRONOMETRO_ON.cronometro_on == true) {
                                BTN_STOP.click()
                                BTN_RESTART.click()
                                CRONOMETRO_ON.cronometro_on = false
                            }
    
                            BTN_START_T.click()
                        }
    
                        if (element.children[0].textContent == 'Finished') {
                            arrastre = false
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
                    // const ToDo_TASK = []
                    if (EDIT.value !== "") {
                        const ORIGINAL_PARRAPH = P.textContent
                        // console.log(ORIGINAL_PARRAPH)
                        // console.log(P.textContent)
                        // console.log(P_INDEX)
                        // console.log(P_INDEX.innerHTML)
                        FATHER.textContent = EDIT.value
                        const MODIFIED_PARRAPH = EDIT.value
                        // console.log(P_INDEX.innerHTML)
                        const PARRAPH_INDEX = P_INDEX.innerHTML
                        const EDITED_TEXT = e.target.parentNode.children[1].textContent
                        // console.log(e.target.parentNode.children[1].textContent)
                        EDIT.remove()
                        BTN2.disabled = false
                        // console.log(ToDo_TASK)
                        CONTAINER.removeAttribute('style')

                        const ToDo_TASK = []
                        // ToDo_TASK[INDEX][1] = EDITED_TEXT
                        // console.log(ToDo_TASK)

                        // const REPLACE = document.getElementsByClassName('stadistic')[0].childNodes[0].textContent.replace(ORIGINAL_PARRAPH, MODIFIED_PARRAPH)
                        document.getElementsByClassName('stadistic')[0].childNodes.forEach((parrafo, indizado) => {
                            if(parrafo.textContent.includes('TEMPORIZADOR')){
                                // console.log(indizado, parrafo)
                                if(parrafo.textContent.includes(PARRAPH_INDEX)){
                                    // console.log('PARRAFO ENCONTRADO ', indizado, parrafo)
                                    const REPLACE = parrafo.textContent.replace(ORIGINAL_PARRAPH, MODIFIED_PARRAPH)
                                    document.getElementsByClassName('stadistic')[0].childNodes[indizado].textContent = REPLACE
                                }
                            }
                        })
                        

                        //EN ESTA LINEA DEBEMOS REALIZAR UN RECORRIDO DE TODAS LAS CARDS DE LAS TAREAS To Do
                        //PARA VOLVER A AGREGARLAS AL LOCALSTORAGE DE 'to_do' Y SOBREESCRIBIR NUEVAMENTE LOS VALORES YA QUE ESTAMOS EDITANDO UNA DE ELLAS
                        document.getElementById('ToDo_tasks').childNodes.forEach((elemento, index) => {
                            if (index > 0) {
                                elemento.childNodes.forEach((elements, indexado) => {
                                    if (indexado < 2) {
                                        // console.log(indexado, elements)
                                        // console.log(elements.textContent)
                                        ToDo_TASK.push(elements.textContent)
                                    }
                                })
                            }
                        })
                        localStorage.setItem('to_do', ToDo_TASK)
                        comboToDo()

                        if(document.getElementById('working').childNodes[5]){
                            document.getElementById('working').childNodes[5].childNodes.forEach((elemento, index) => {
                                if (index < 2) {
                                    // console.log(index, elemento)
                                    // console.log(elemento.textContent)
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

function comboToDo(){
    // console.log(`Funcion combo ToDo`)
    ToDo_TASK.length=0
    const TODO = document.getElementById('todo')
    TODO.childNodes[3].childNodes.forEach((element, index) => {
        if(index > 0){
            element.childNodes.forEach((elemento, index) => {
                if(index < 2){
                    ToDo_TASK.push(elemento.textContent)
                    // console.log(ToDo_TASK)
                    localStorage.removeItem('to_do')
                }
            })
        }
    })
    localStorage.setItem('to_do', ToDo_TASK)
}

function comboWorking(){
    // console.log(`Funcion combo Working`)
    WORKING.length=0
    localStorage.removeItem('WORKING')
    const WORK = document.getElementById('working')
    if(WORK.childNodes[5]){
        WORK.childNodes[5].childNodes.forEach((element, index) => {
            if(index < 2){
                // console.log(element.textContent)
                WORKING.push(element.textContent)
                localStorage.removeItem('WORKING')
            }
        })
        localStorage.setItem('WORKING', WORKING)
    }
}

function comboFinished(){
    // console.log(`Funcion combo Finished`)
    FINISHED.length=0
    localStorage.removeItem('FINISHED')
    const FINISH = document.getElementById('finish')
    
    FINISH.childNodes.forEach((element, index) => {
        if(index > 4){
            element.childNodes.forEach((elemento, index) => {
                if(index < 2){
                    // console.log(elemento.textContent)
                    FINISHED.push(elemento.textContent)
                    localStorage.removeItem('FINISHED')
                }
            })
        }
        localStorage.setItem('FINISHED', FINISHED)
    })
}