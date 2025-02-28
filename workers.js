let pomodoroTimers = {}
let cronometros = {}
let statistic = {}
let timeLeft;
let statistics_on = false
let timeElapsed = 0
let timeElapsed1 = 0
let interval_relax = 1000
let interval_time = 1000

self.onmessage = function (e) {
    const { action, id, type, duration, interval, INTERVALO_T } = e.data
    
    if (action === "start") {
        if (type === "pomodoro") {
            if (pomodoroTimers[id]) return

            timeLeft = duration
            interval_time = INTERVALO_T
            pomodoroTimers[id] = setInterval(() => {
                timeLeft--

                self.postMessage({ id, type, timeLeft })
                if (timeLeft <= 0) {
                    timeElapsed = 0
                    clearInterval(pomodoroTimers[id])
                    delete pomodoroTimers[id]
                    self.postMessage({ id, type, finished: true })
                }
            }, interval_time)
        } else if (type === "cronometro") {
            if (cronometros[id]) return
            interval_relax=interval
            cronometros[id] = setInterval(() => {
                timeElapsed++

                self.postMessage({ id, type, timeElapsed })
            }, interval_relax)
        } else if (type === "statistic") {
            if (statistic[id]) return
            statistic[id] = setInterval(() => {
                timeElapsed1++
                self.postMessage({ id, type, timeElapsed1 })
            }, 1000)
        }
    }

    if (action === "stop") {
        if (type === "pomodoro") {
            clearInterval(pomodoroTimers[id])
            delete pomodoroTimers[id]
            self.postMessage({ id, type, stopped: true })
        }

        if (type === "cronometro") {
            clearInterval(cronometros[id])
            delete cronometros[id]
            self.postMessage({ id, type, stopped: true })
        }

        if (type === "statistic") {
            return
        }
    }
}