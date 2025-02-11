let totalSegundos;
let totalSegundosEstadisticas = 0

// Recibir el tiempo inicial desde el script principal
self.onmessage = function (e) {
    if (e.data.action === "start") {
        totalSegundos = e.data.time;
        runTimer();
    } else if (e.data.action === "pause") {
        clearInterval(self.interval);
    }
};

// Función que maneja el temporizador
function runTimer() {
    self.interval = setInterval(() => {
        if (totalSegundos > 0) {
            totalSegundos--;
            // console.log('por aca...')
            self.postMessage({ timeLeft: totalSegundos });
        } else {
            clearInterval(self.interval);
            self.postMessage({ finished: true });
        }
    }, 1000);
}

