let pomodoroTimers = {}
let cronometros = {}

self.onmessage = function (e) {
    const { action, id, type, duration } = e.data
    console.log('e.data: ', e.data)

    if (action === "start") {
        if (type === "pomodoro") {
            if (pomodoroTimers[id]) return

            let timeLeft = duration
            pomodoroTimers[id] = setInterval(() => {
                timeLeft--

                self.postMessage({ id, type, timeLeft })

                if (timeLeft <= 0) {
                    clearInterval(pomodoroTimers[id])
                    delete pomodoroTimers[id]
                    self.postMessage({ id, type, finished: true })
                }
            }, 1000)
        }
        else if (type === "cronometro") {
            if (cronometros[id]) return

            let timeElapsed = 0
            cronometros[id] = setInterval(() => {
                timeElapsed++

                self.postMessage({ id, type, timeElapsed })

            }, 1000)
        }
    }

    if (action === "stop") {
        if (type === "pomodoro" && pomodoroTimers[id]) {
            clearInterval(pomodoroTimers[id])
            delete pomodoroTimers[id]
            self.postMessage({ id, type, stopped: true })
        }

        else if (type === "cronometro" && cronometros[id]) {
            clearInterval(cronometros[id])
            delete cronometros[id]
            self.postMessage({ id, type, stopped: true })
        }
    }
}